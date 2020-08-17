const { prompt } = require('inquirer');
const { hasContext } = require("../../../tools/context");
const { workspaceModel } = require('../../../managers/workspaces_manager');
const { logInfo } = require('../../../tools/helper');
const { deleteVariable } = require('./handler')

exports.callDeleteVariable = function() {
    if(hasContext()) {
        var inputs = [
            {
                type: 'list',
                name: 'name',
                message: 'Select the variable to delete:',
                choices: workspaceModel.getVariableNames()
            },
            {
                type: 'confirm',
                name: 'delete',
                message: 'Are you sure to delete this variable ?',
            },
        ]
        
        if(workspaceModel.getVariableNames().length > 0) {
            prompt(inputs).then(answers => {
                if(answers.delete) {
                    deleteVariable(answers);
                }   
            });
        } else logInfo('No variable to delete')    
    }
}