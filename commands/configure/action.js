const { prompt } = require('inquirer');
const path = require('path');
const { loadConfig } = require('../../tools/config');
const { configureContext } = require('./handler');
const { commandManager } = require('../../managers/command_manager');
const VariableSpec = require('../../models/Variable');
const ConfSpec = require('../../models/ConfSpec');

exports.callConfigure = function (command) {
    if (command.silent) {
        var spec = new ConfSpec();
        var cname = new VariableSpec("context");
        var cenv = new VariableSpec("env");
        var cversion = new VariableSpec("terraform");
        
        spec.register(cname);
        spec.register(cenv);
        spec.register(cversion);
        status = spec.check(command);

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