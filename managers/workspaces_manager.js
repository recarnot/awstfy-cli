const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const { renderString } = require('template-file')
const { getInfo } = require('../tools/helper');
const { getWorkspaceConfigPath, loadConfig } = require('../tools/config');
const { TFResoureTemplate } = require('../templates/template');

class WorkspaceModel {
    constructor() {
    }

    workspaces = [];
    variables = {};
    _initialized = false;

    init() {
        try {
            var content = fs.readFileSync(getWorkspaceConfigPath(), {encoding:'utf8'});
            var obj = JSON.parse(content);

            this.workspaces = obj.workspaces || [];
            this.variables = obj.variables || {};
            
            this._initialized = true;
        }
        catch(err) {
            console.error(err);
        }
    }

    exist(name) {
        return this.workspaces.indexOf(name) > -1;
    }

    register(name) {
        if(!this.exist(name)) {
            this.workspaces.push(name);
            this.save();
        }
    }
    
    save() {
        if(!this._initialized) return;
        
        var filename = getWorkspaceConfigPath();
        var content = JSON.stringify(this)
        fs.writeFileSync(filename, content);
    }

    addVariable(variable) {
        this.variables[variable.name] = variable;

        this.save();
        this.export();
    }

    getVariable(name) {
        return this.variables[name];
    }

    getVariableValue(name, workspace) {
        if(!workspace) workspace = 'default';

        return this._workspace[workspace][name];
    }
    
    getVariableNames() {
        var list = [];
        for (const key in this.variables) {
            list.push(key);
        }
        list.sort();
        return list;
    }

    getChoices() {
        var questions = [];
        
        this.workspaces.forEach(element => {
            questions.push({
                type: 'input',
                name: `value_${element}`,
                message: `Enter the value in '${element}' workspace:`,
                when: function(answers) {
                    if(answers.overwrite == undefined) return true;
                    if(!answers.overwrite) return false;
                    return true;
                },
                validate: function(result) {
                    if(result.length < 1) {
                        return 'Must be set.'
                    }
                    return true
                }
            })
        });
        
        return questions;
    }

    updateVariable(variable) {
        var name = variable.name;
        if(this.variables.hasOwnProperty(name)) {
            this.variables[name] = variable;

            this.save();
            this.export();
        }
    }

    deleteVariable(name) {
        if(this.variables.hasOwnProperty(name)) {
            delete this.variables[name];

            this.save();
            this.export();
        }
    }

    clean(list) {
        var consolidate = this.workspaces.concat([]).filter(item => list.includes(item));
        var cleaner = this.workspaces.concat([]).filter(item => !list.includes(item));
        var variable;

        for (const key in this.variables) {
            cleaner.forEach(element => {
                delete this.variables[key]['values'][element];
                shell.rm(`env_${element}.tfvars`);
            });
        }

        this.workspaces = consolidate;
        this.save();
    }

    export() {
        this._exportTFVars();
        this._exportVariables();
    }

    _exportTFVars() {
        var content = '';
        var newline = "\n";
        var filename = '';
        
        for (let index = 0; index < this.workspaces.length; index++) {
            const element = this.workspaces[index];
            
            content = `#Auto generated by ${getInfo().name}: ${getInfo().version}`;
            filename = process.cwd() + `/env_${element}.tfvars`;

            for (const key in this.variables) {
                const variable = this.variables[key];

                if(variable.type === 'string') {
                    content += newline + `${variable.name}= \"${variable.values[element]}\"`;
                }
                else content += newline + `${variable.name}= ${variable.values[element]}`;
            }
            
            fs.writeFileSync(filename, content);
            content = '';
        };
    }

    _exportVariables() {
        var content = `#Auto generated by ${getInfo().name}: ${getInfo().version}`;
        var newline = "\n";
        var filename = process.cwd() + '/env_variables.tf';
        var template_name = loadConfig('tf_version', '0.12') === '0.12' ? TFResoureTemplate.Variable_012 : TFResoureTemplate.Variable_013;
        var template_file = path.dirname(fs.realpathSync(__filename)) + "/templates/" + template_name
        var template = shell.cat(template_file);
        var variable;

        for (const key in this.variables) {
            variable = this.variables[key];    
            content += renderString(template, variable) + newline;
        }   

        fs.writeFileSync(filename, content);
    }

    toString() {
        console.info(this.workspaces);
    }
}

const wsmodel = new WorkspaceModel();
exports.workspaceModel = wsmodel;