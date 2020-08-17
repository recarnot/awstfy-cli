const inquirer = require('inquirer');
const { configureEFSStorage } = require("./handler");

var data = {};

var base_inputs = [
    {
        type: 'input',
        name: 'id',
        message: 'Enter the Terrafom resource id:',
        validate: function(result) {
            if(result.length < 1) {
                return 'Must be set.'
            }
            return true
        }
    },
    {
        type: 'input',
        name: 'kms_key',
        message: 'Enter the KMS Key id for encryption (optional):',
    },
    {
        type: 'list',
        name: 'performance_mode',
        message: 'Choose the performance mode:',
        default: 'generalPurpose',
        choices: [
            {
                name: 'generalPurpose',
                value: 'generalPurpose'
            },
            {
                name: 'maxIO',
                value: 'maxIO'
            }
        ]
    },
    {
        type: 'list',
        name: 'throughput_mode',
        message: 'Choose the throughput mode:',
        default: 'bursting',
        choices: [
            {
                name: 'bursting',
                value: 'bursting'
            },
            {
                name: 'provisioned',
                value: 'provisioned'
            }
        ]
    },
    {
        type: 'input',
        name: 'throughput',
        message: 'Enter the throughput, measured in MiB/s (optional):',
        default: 0
    },
    {
        type: 'list',
        name: 'transition_to_ia',
        message: 'Lifecycle policy:',
        default: 'none',
        choices: [
            {
                name: 'None',
                value: 'none'
            },
            {
                name: 'After 7 days => IA Storage',
                value: 'AFTER_7_DAYS'
            },
            {
                name: 'After 14 days => IA Storage',
                value: 'AFTER_14_DAYS'
            },
            {
                name: 'After 30 days => IA Storage',
                value: 'AFTER_30_DAYS'
            },
            {
                name: 'After 60 days => IA Storage',
                value: 'AFTER_60_DAYS'
            },
            {
                name: 'After 90 days => IA Storage',
                value: 'AFTER_90_DAYS'
            }
        ]
    }
];

function efsBaseAction(force) {
    inquirer.prompt(base_inputs).then(answers => {
        configureEFSStorage(answers, force);
    });
}
exports.efsBaseAction = efsBaseAction;

