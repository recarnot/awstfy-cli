const { prompt } = require('inquirer');
const { getWorkspaces } = require('../workspace');
const { configureSelectEnv } = require('./handler');
const { loadConfig } = require('../../../tools/config');

exports.callEnvSelect = function () {
    var inputs = [
        {
            type: 'list',
            name: 'name',
            message: 'Choose the workspace:',
            default: loadConfig('workspace', 'default'),
            choices: getWorkspaces()
        },
    ];
    prompt(inputs).then(answers => {
        configureSelectEnv(answers);
    })
}
