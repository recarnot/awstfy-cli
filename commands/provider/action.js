const { prompt } = require('inquirer');
const { loadConfig, saveConfig } = require('../../tools/config');
const { configureLocalProvider, configureTFCProvider } = require('./handler');
const { TFRegionList } = require('../../constants.js');
const { profileManager } = require('../../managers/profiles_manager');

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

function action() {
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

exports.callProvider = action