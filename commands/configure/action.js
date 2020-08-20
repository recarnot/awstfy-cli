const { prompt } = require('inquirer');
const path = require('path');
const { loadConfig } = require('../../tools/config');
const { configureContext } = require('./handler');
const { commandManager } = require('../../managers/command_manager');
const VariableSpec = require('../../models/VariableSpec');
const ContextSpec = require('./ContextSpec');

exports.callConfigure = function (command) {
    if (command.silent) {
        var context = new ContextSpec();
        cname = new VariableSpec("context-name");
        cenv = new VariableSpec("context-env");
        cversion = new VariableSpec("terraform-version");
        context.register(cname);
        context.register(cenv);
        context.register(cversion);
        status = context.check(command);

        if (status.success) {
            var conf = {
                context : cname.value,
                environment : cenv.value,
                tf_version : cversion.value,
            }
            configureContext(conf);
        }
        else console.info(status.message);

        return;
    }
    
    var init_inputs = [
        {
            type: 'input',
            name: 'context',
            message: 'Enter a name for the project:',
            default: loadConfig('context', path.basename(path.resolve(process.cwd()))),
            validate: function (result) {
                if (result.length < 3) {
                    return 'Must be set.'
                }
                return true
            }
        },
        {
            type: 'input',
            name: 'environment',
            message: 'Choose the default Terraform workspace to use:',
            default: loadConfig('environment', 'default'),
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

    prompt(init_inputs).then(answers => {
        configureContext(answers);
    })
}