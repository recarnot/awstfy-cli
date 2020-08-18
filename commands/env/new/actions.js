const { prompt } = require('inquirer');
const { getWorkspaces } = require('../workspace');
const { configureNewEnv } = require('./handler');

exports.callEnvNew = function () {
    var inputs = [
        {
            type: 'input',
            name: 'name',
            message: `Enter the name of the workspace (already used: ${getWorkspaces()}):`,
            validate: function (result) {
                if (result.length < 3) {
                    return 'Must be set.'
                }
                return true
            }
        },
    ];

    prompt(inputs).then(answers => {
        configureNewEnv(answers);
    })
}
