const { prompt } = require('inquirer');
const { configureLocalBackend, configureTFCBackend, configureS3Backend } = require('./handler');
const { saveConfig, loadConfig } = require('../../tools/config');
const { TFRegionList } = require('../../constants');
const { cloudManager } = require("../../managers/cloud_manager");

var backend_inputs = {
    type: 'list',
    name: 'backend_type',
    default: loadConfig('backend_type', 'local'),
    message: 'Choose the type of backend for this project:',
    choices: [
        {
            name: 'Local backend',
            value: 'local'
        },
        {
            name: 's3 backend',
            value: 's3'
        },
        {
            name: 'Terraform Cloud backend',
            value: 'tfc'
        },
    ],
}
var tfc_inputs = [
    {
        type: 'input',
        name: 'backend_host',
        message: 'Enter the Terraform Cloud hostname:',
        default: loadConfig('backend_host', loadConfig('cloud_hostname', 'app.terraform.io')),
        validate: function(result) {
            if(result.length < 1) {
                return 'Must be set.'
            }
            return true
        }
    },
    {
        type: 'input',
        name: 'backend_organization',
        message: 'Organization:',
        default: loadConfig('backend_organization', null),
        validate: function(result) {
            if(result.length < 1) {
                return 'Must be set.'
            }
            return true
        },
        when: function(answers) {
            return cloudManager.organizations.length < 1;
        }
    },
    {
        type: 'list',
        name: 'backend_organization',
        message: 'Choose Terraform Cloud organization:',
        default: loadConfig('cloud_organization', null),
        choices: cloudManager.organizations,
        when: function(answers) {
            return cloudManager.organizations.length > 0;
        }
    },
    {
        type: 'input',
        name: 'backend_workspace',
        message: 'Workspace:',
        default: loadConfig('backend_workspace', null),
        validate: function(result) {
            if(result.length < 1) {
                return 'Must be set.'
            }
            return true
        }
    },
];

var s3_inputs = [
    {
        type: 'input',
        name: 'backend_bucket',
        message: 'Bucket name:',
        default: loadConfig('backend_bucket', ''),
        validate: function(result) {
            if(result.length < 1) {
                return 'Must be set.'
            }
            return true
        }
    },
    {
        type: 'input',
        name: 'backend_key',
        message: 'Key:',
        default: loadConfig('backend_key', ''),
        validate: function(result) {
            if(result.length < 1) {
                return 'Must be set.'
            }
            return true
        }
    },
    {
        type: 'list',
        name: 'backend_region',
        message: 'Bucket region:',
        default: loadConfig('backend_region', 'eu-west-1'),
        choices: TFRegionList
    }
];

exports.callBackend = function() {
    prompt(backend_inputs).then(answers => {
        saveConfig('backend_type', answers.backend_type)

        switch(answers.backend_type) {
            case 'local' : 
                configureLocalBackend(answers)
                break;
            case 'tfc' : 
                prompt(tfc_inputs).then(answers => {
                    configureTFCBackend(answers)
                })
                break;
            case 's3' : 
                prompt(s3_inputs).then(answers => {
                    configureS3Backend(answers)
                })
                break;
            case 'consul': 
                break;
        }
    })
}
