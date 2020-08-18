const inquirer = require('inquirer');
const { configureS3Storage } = require("./handler");

function s3Action(force) {
    var data = {};
    var base_inputs = [
        {
            type: 'input',
            name: 'id',
            message: 'Enter the Terrafom resource id:',
            validate: function (result) {
                if (result.length < 1) {
                    return 'Must be set.'
                }
                return true
            }
        },
        {
            type: 'input',
            name: 'name',
            message: 'Bucket prefix:',
            validate: function (result) {
                if (result.length < 5) {
                    return 'Must be set.'
                }
                return true
            }
        },
        {
            type: 'checkbox',
            name: 'options',
            message: 'Options:',
            choices: [
                {
                    name: 'versioning',
                    value: 'version'
                },
                {
                    name: 'logs',
                    value: 'logs'
                },
                {
                    name: 'encryption',
                    value: 'encryption'
                }
            ],
        },
        {
            type: 'list',
            name: 'acl',
            message: 'Access Control List:',
            default: 'private',
            choices: [
                {
                    name: 'private',
                    value: 'private'
                },
                {
                    name: 'public-read',
                    value: 'public-read'
                },
                {
                    name: 'public-read-write',
                    value: 'public-read-write'
                }
            ]
        },
        {
            type: 'checkbox',
            name: 'transition',
            message: 'Lifecycle:',
            choices: [
                {
                    name: 'After 30 days => Standart IA',
                    value: '30'
                },
                {
                    name: 'After 60 days => Glacier',
                    value: '60'
                },
                {
                    name: 'Expiration after 90 days',
                    value: '90'
                }
            ]
        }
    ]

    inquirer.prompt(base_inputs).then(answers => {
        data.id = answers.id;
        data.prefix = answers.name;
        data.versioning = answers.options.indexOf('version') > -1;
        data.logs = answers.options.indexOf('logs') > -1;
        data.encryption = answers.options.indexOf('encryption') > -1;
        data.acl = answers.acl;
        data.transition_30 = answers.transition.indexOf('30') > -1
        data.transition_60 = answers.transition.indexOf('60') > -1
        data.expiration = answers.transition.indexOf('90') > -1

        configureS3Storage(data, force);
    });
}
exports.s3Action = s3Action;
