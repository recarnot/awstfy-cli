const { prompt } = require('inquirer');
const path = require('path');
const { loadConfig } = require('../../tools/config');
const { configureContext } = require('./handler');

var init_inputs = [
    {
        type: 'input',
        name: 'context',
        message: 'Enter a name for the project:',
        default: loadConfig('context', path.basename(path.resolve(process.cwd()))),
        validate: function(result) {
            if(result.length < 3) {
                return 'Must be set.'
            }
            return true
        }
    },
    {
        type: 'input',
        name: 'environement',
        message: 'Choose the default Terraform workspace to use:',
        default: loadConfig('environement', 'default'),
    },
    {
        type: 'list',
        name: 'tf_version',
        message: 'Choose the Terraform version:',
        default: loadConfig('tf_version', 'automatic'),
        choices: [
            {
                name: 'Automatically use your version',
                value: 'automatic'
            },
            {
                name: 'Force version 0.12',
                value: '0.12'
            },
            {
                name: 'Force version 0.13',
                value: '0.13'
            }
        ]
    }
];

exports.callConfigure = function() {
    prompt(init_inputs).then(answers => {
        configureContext(answers);
    })
}