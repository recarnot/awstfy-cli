const { prompt } = require('inquirer');
const { configureTFCState, configureS3State } = require('./handler');
const { TFRegionList } = require('../../../constants.js');
const { cloudManager } = require('../../../managers/cloud_manager');

var rstate_inputs = {
    type: 'list',
    name: 'rtstate_type',
    message: 'Choose the type of Remote State to connect:',
    choices: [
        {
            name: 'S3 Remote State',
            value: 's3'
        },
        {
            name: 'Terraform Remote state',
            value: 'tfc'
        },
    ],
}

var rstate_tfc_inputs = [
    {
        type: 'input',
        name: 'id',
        message: 'Enter the Terrafom resource id:',
        default: 'remote_state',
        validate: function(result) {
            if(result.length < 1) {
                return 'Must be set.'
            }
            return true
        }
    },
    {
        type: 'input',
        name: 'organization',
        message: 'Organization:',
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
        name: 'organization',
        message: 'Choose Terraform Cloud organization:',
        choices: cloudManager.organizations,
        when: function(answers) {
            return cloudManager.organizations.length > 0;
        }
    },
    {
        type: 'input',
        name: 'workspace',
        message: 'Enter the neame of the Workspace:',
        validate: function(result) {
            if(result.length < 1) {
                return 'Must be set.'
            }
            return true
        }
    }
];

var rstate_s3_inputs = [
    {
        type: 'input',
        name: 'id',
        message: 'Enter the Terrafom resource id:',
        default: 'remote_state',
        validate: function(result) {
            if(result.length < 1) {
                return 'Must be set.'
            }
            return true
        }
    },
    {
        type: 'input',
        name: 'bucket',
        message: 'Enter the bucket name:',
        validate: function(result) {
            if(result.length < 1) {
                return 'Must be set.'
            }
            return true
        }
    },
    {
        type: 'input',
        name: 'key',
        message: 'Enter the bucket key:',
        validate: function(result) {
            if(result.length < 1) {
                return 'Must be set.'
            }
            return true
        }
    },
    {
        type: 'list',
        name: 'region',
        message: 'Choose the AWS region where the bucket is:',
        choices: TFRegionList
    }
];

function action(opts) {
    var force = opts.force || false;
    
    prompt(rstate_inputs).then(answers => {
        if(answers.rtstate_type == 'tfc') {
            prompt(rstate_tfc_inputs).then(answers => {
                configureTFCState(answers, force)
            })
        } else {
            prompt(rstate_s3_inputs).then(answers => {
                configureS3State(answers, force)
            })
        }
    })
}
exports.callRState = action