const { prompt } = require('inquirer');
const { hasContext, getAWSProfiles } = require('../../../tools/context');
const { configureLocalProvider, configureTFCProvider } = require('./handler');
const { TFRegionList } = require('../../../constants');
const { profileManager } = require("../../../managers/profiles_manager");

exports.callProviderAlias = function (opts) {
    var force = opts.force || false;
    var provider_inputs = {
        type: 'list',
        name: 'provider_type',
        message: 'Type of provider:',
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
            type: 'input',
            name: 'id',
            message: 'Alias:',
            validate: function (result) {
                if (result.length < 1) {
                    return 'Must be set.'
                }
                return true
            }
        },
        {
            type: 'list',
            name: 'profile',
            message: 'AWS Profile:',
            choices: profileManager.list()
        },
        {
            type: 'list',
            name: 'region',
            message: 'AWS Region:',
            choices: TFRegionList
        }
    ];

    var provider_tfc_inputs = [
        {
            type: 'input',
            name: 'id',
            message: 'Alias:',
            validate: function (result) {
                if (result.length < 1) {
                    return 'Must be set.'
                }
                return true
            }
        },
        {
            type: 'input',
            name: 'access_key_var',
            message: 'AWS Access key variable name:',
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
            message: 'AWS Secret key variable name:',
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
            message: 'AWS Region variable name:',
            validate: function (result) {
                if (result.length < 5) {
                    return 'Must be set.'
                }
                return true
            }
        },
    ];

    if (hasContext()) {
        prompt(provider_inputs).then(answers => {
            if (answers.provider_type == 'local') {
                prompt(provider_local_inputs).then(answers => {
                    configureLocalProvider(answers, force)
                })
            } else {
                prompt(provider_tfc_inputs).then(answers => {
                    configureTFCProvider(answers, force)
                })
            }
        })
    }
}
