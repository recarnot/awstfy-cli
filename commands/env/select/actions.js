const { prompt } = require('inquirer');
const { getWorkspaces } = require('../workspace');
const { configureSelectEnv } = require('./handler');
const { loadConfig } = require('../../../tools/config');

var inputs = [
    {
        type: 'list',
        name: 'name',
        message: 'Choose the workspace:',
        default: loadConfig('workspace', 'default'),
        choices: getWorkspaces()
    },
];

exports.callEnvSelect = function() {
    prompt(inputs).then(answers => {
        configureSelectEnv(answers);
    })
}
