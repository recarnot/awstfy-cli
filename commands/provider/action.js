const { prompt } = require('inquirer');
const { loadConfig, saveConfig } = require('../../tools/config');
const { configureLocalProvider, configureTFCProvider } = require('./handler');
const { TFRegionList } = require('../../constants.js');
const { profileManager } = require('../../managers/profiles_manager');
const ConfSpec = require('../../models/ConfSpec');
const VariableSpec = require('../../models/Variable');
const { logError } = require('../../tools/helper');

exports.callProvider = function (command) {

    if (command.silent) {
        var spec;
        var status;
        var ctype = new VariableSpec('provider-type');
        spec = new ConfSpec();
        spec.register(ctype);
        status = spec.check(command);

        if (status.success) {
            switch (ctype.value) {
                case "local":
                    var aws_profile = new VariableSpec('aws-profile');
                    var aws_region = new VariableSpec('aws-region');
                    spec = new ConfSpec();
                    spec.register(aws_profile);
                    spec.register(aws_region);
                    status = spec.check(command);

                    if (status.success) {
                        var conf = {
                            aws_profile: aws_profile.value,
                            aws_region: aws_region.value,
                        }
                        configureLocalProvider(conf);
                    }
                    else console.info(status.message);

                    return;
                case "tfc":
                    var tfc_access = new VariableSpec('tfc-key');
                    var tfc_secret = new VariableSpec('tfc-secret');
                    var tfc_region = new VariableSpec('tfc-region');
                    spec = new ConfSpec();
                    spec.register(tfc_access);
                    spec.register(tfc_secret);
                    spec.register(tfc_region);
                    status = spec.check(command);

                    if (status.success) {
                        var conf = {
                            access_key_var: tfc_access.value,
                            secret_key_var: tfc_secret.value,
                            region_var: tfc_region.value,
                        }
                        configureTFCProvider(conf);
                    }
                    else console.info(status.message);

                    return;
                default:
                    logError("--type must be 'local' or 'tfc'");
                    return;
            }
        } else {
            console.info(status.message);
        }
        return;
    }

    var provider_inputs = {
        type: 'list',
        name: 'provider_type',
        message: 'Choose the type of provider for this project:',
        default: loadConfig('provider_type', 'local'),
        choices: [
            {
                name: 'Local provider',
                value: 'local'
            },
            {
                name: 'Terraform Cloud provider',
                value: 'tfc'
            },
        ],
    }

    var provider_local_inputs = [
        {
            type: 'list',
            name: 'aws_profile',
            message: 'Choose the AWS profile:',
            default: loadConfig('aws_profile', 'open'),
            choices: profileManager.list()
        },
        {
            type: 'list',
            name: 'aws_region',
            message: 'Choose the AWS Region:',
            default: loadConfig('aws_region', 'eu-west-1'),
            choices: TFRegionList
        }
    ];

    var provider_tfc_inputs = [
        {
            type: 'input',
            name: 'access_key_var',
            message: 'Enter the name of the variable to retreive AWS Access key id:',
            default: loadConfig('access_key_var', 'aws_access_key'),
            validate: function (result) {
                if (result.length < 1) {
                    return 'Must be set.'
                }
                return true
            }
        },
        {
            type: 'input',
            name: 'secret_key_var',
            message: 'Enter the name of the variable to retreive AWS Secret key:',
            default: loadConfig('secret_key_var', 'aws_secret_key'),
            validate: function (result) {
                if (result.length < 1) {
                    return 'Must be set.'
                }
                return true
            }
        },
        {
            type: 'input',
            name: 'region_var',
            message: 'Enter the name of the variable to retreive AWS Region:',
            default: loadConfig('region_var', 'aws_region'),
            validate: function (result) {
                if (result.length < 5) {
                    return 'Must be set.'
                }
                return true
            }
        },
    ];

    prompt(provider_inputs).then(answers => {
        saveConfig('provider_type', answers.provider_type);

        if (answers.provider_type == 'local') {
            prompt(provider_local_inputs).then(answers => {
                configureLocalProvider(answers)
            })
        } else {
            prompt(provider_tfc_inputs).then(answers => {
                configureTFCProvider(answers)
            })
        }
    })
}