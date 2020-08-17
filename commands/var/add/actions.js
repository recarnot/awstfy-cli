const { prompt } = require('inquirer');
const { hasContext } = require("../../../tools/context");
const { addVariable } = require('./handler');
const { loadConfig } = require('../../../tools/config');
const { workspaceModel } = require('../../../managers/workspaces_manager');

exports.callAddVariable = function() {
    if(hasContext()) {
        var base_inputs = [
            {
                type: 'input',
                name: 'name',
                message: 'Enter the name of the variable:',
                validate: function(result) {
                    if(result.length < 3) {
                        return 'Must be set.'
                    }
                    return true
                }
            },
            {
                type: 'confirm',
                name: 'overwrite',
                message: 'This variable already exist !. Do you want to update ?',
                when: function( answers ) {
                    if(workspaceModel.getVariable(answers.name) != undefined) {
                        return true;
                    }
                    return false;
                },
            },
            {
                type: 'input',
                name: 'description',
                message: 'Enter a description (optional):',
                when: function(answers) {
                    if(answers.overwrite == undefined) return true;
                    if(!answers.overwrite) return false;
                    return true;
                }
            },
            {
                type: 'list',
                name: 'type',
                message: 'Select the type of the variable:',
                default: 'string',
                choices: ['string', 'number', 'bool', 'list(string)', 'list(number)'],
                when: function(answers) {
                    if(answers.overwrite == undefined) return true;
                    if(!answers.overwrite) return false;
                    return true;
                }
            },
            {
                type: 'input',
                name: 'default',
                message: 'Enter a default value for this variable (optional):',
                when: function(answers) {
                    if(answers.overwrite == undefined) return true;
                    if(!answers.overwrite) return false;
                    return true;
                }
            },
            {
                type: 'input',
                name: 'condition',
                message: 'Enter a condition which validate the value (optional):',
                when: function(answers) {
                    if(answers.overwrite == undefined || answers.overwrite) {
                        if(loadConfig('tf_version') == '0.13') return true;
                    }
                    
                    return false
                }
            },
            {
                type: 'input',
                name: 'error_message',
                message: 'Enter an error message if value is not validated (optional):',
                when: function(answers) {
                    if(answers.overwrite == undefined || answers.overwrite) {
                        if(loadConfig('tf_version') == '0.13') return true;
                    }
        
                    return false
                }
            },
        ];
        
        var inputs = base_inputs.concat(workspaceModel.getChoices());

        prompt(inputs).then(answers => {
            if(answers.overwrite != false) {
                addVariable(answers)
            }   
        })
    }
}