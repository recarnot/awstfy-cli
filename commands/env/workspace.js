const shell = require('shelljs');
const fs = require('fs');
const { logSuccess, logError, getInfo, logWarning, logInfo } = require('../../tools/helper');
const { workspaceModel } = require('../../managers/workspaces_manager');
const { saveConfig } = require('../../tools/config');
const TFVariable = require('../var/variable');
var fix = true;

exports.getWorkspaces = function() {
    return update().names;
}

exports.getSelectedWorkspace = function() {
    return update().selected;
}

exports.createWorkspace = function(name) {
    var envFilename = `env_${name}.tfvars`;
    
    if(!shell.test('-f', envFilename)) {
        shell.touch(envFilename);
        initFile(envFilename, name);
    }

    if(!isDefault(name)) {
        shell.exec(`terraform workspace new ${name}`, {silent:true}, function(code, stdout, stderr) {
            switch(code) {
                case 0: 
                    logSuccess(stdout);
                    break;
                default:
                    logError(stderr);
            }
        });
    }
    workspaceModel.register(name);
}

exports.selectWorkspace = function(name) {
    shell.exec(`terraform workspace select ${name}`, {silent:true}, function(code, stdout, stderr) {
        switch(code) {
            case 0:
                if(stdout.length == 0) {
                    logSuccess(`Switched to workspace "${name}".`)
                }
                else logSuccess(stdout);
                saveConfig('workspace', name);
                break;
            default:
                logError(stderr);
        }
    });
}

function isDefault(name) {
    return name === 'default';
}

function update() {
    var workspace_names = [];
    var env_names = [];
    var env_selected = 'default';
    var result = shell.exec('terraform workspace list', {silent:true});

    switch(result.code) {
        case 0:
            workspace_names = result.stdout.split("\n");

            Object.keys(workspace_names).forEach(key => {
                workspace_names[key] = workspace_names[key].trim();
                }
            );
            
            workspace_names.forEach(element => {
                let env_name = element;

                if(element.indexOf('*') == 0) {
                    env_name = element.substr(element.indexOf('*') + 2);
                    env_selected = env_name;
                }
                
                if(env_name != '') env_names.push(env_name);
            });
            
            env_names.forEach(element => {
                workspaceModel.register(element);
            });

            workspaceModel.clean(env_names);
            workspaceModel.flush();

            fix = true;
            return { names: env_names, selected: env_selected };
        case 1:
            if(fix) {
                console.info(result.stdout);
                logWarning('Returns default workspace');
                fix = false;
            }
    }

    return { names: ['default'], selected: env_selected }; 
}

function initFile(filename, env) {
    filename = process.cwd() + '/' + filename;
    var header = `#This file is managed by ${getInfo().name}. All manual modifications will be lost.`
    content = header + "\n" + `environement= "${env}"`;

    fs.writeFileSync(filename, content, (err) => {
        if (err) {
            console.error(err)
            throw err;
        }
    });
}
