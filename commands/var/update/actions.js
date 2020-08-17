const { prompt } = require('inquirer');
const { updateVariable } = require("./handler");
const { workspaceModel } = require("../../../managers/workspaces_manager");
const { hasContext } = require("../../../tools/context");
const { loadConfig } = require('../../../tools/config');

exports.callUpdateVariable = function() {
    var select_input = {
        type: 'list',
        name: 'name',
        message: 'Select the variable to update:',
        choices: workspaceModel.getVariableNames()
    }
    
    if(hasContext()) {
        prompt(select_input).then(answers => {
                var variable = workspaceModel.getVariable(answers.name);

                var base_inputs = [
                    {
                        type: 'input',
                        name: 'description',
                        default: variable.description,
                        message: 'Enter a description (optional):',
                    },
                    {
                        type: 'list',
                        name: 'type',
                        message: 'Select the type of the variable:',
                        default: variable.type,
                        choices: ['string', 'number', 'bool', 'list(string)', 'list(number)'],
                    },
                    {
                        type: 'input',
                        name: 'default',
                        default: variable.default,
                        message: 'Enter a default value for this variable (optional):',
                    },
                    {
                        type: 'input',
                        name: 'condition',
                        default: variable.condition,
                        message: 'Enter a condition which validate the value (optional):',
                        when: function(answers) {
                            if(loadConfig('tf_version') == '0.13') return true;
                            
                            return false
                        }
                    },
                    {
                        type: 'input',
                        name: 'error_message',
                        message: 'Enter an error message if value is not validated (optional):',
                        default: variable.error_message,
                        when: function(answers) {
                            if(loadConfig('tf_version') == '0.13') return true;
                
                            return false
                        }
                    },
                ];
                
                var inputs = base_inputs.concat(workspaceModel.getChoices());
                prompt(inputs).then(answers => {
                    answers.name = variable.name;
                    updateVariable(answers);
                });
                
        })
    }
}