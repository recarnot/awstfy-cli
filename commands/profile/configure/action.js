const { prompt } = require('inquirer');
const { configureProfile } = require('./handler');
const { TFRegionList } = require('../../../constants.js');

exports.callConfigureProfile = function () {
    var inputs = [
        {
            type: 'input',
            name: 'name',
            message: 'Name:',
            validate: function (result) {
                if (result.length < 3) {
                    return 'Must be set.'
                }
                return true
            }
        },
        {
            type: 'input',
            name: 'aws_access_key_id',
            message: 'AWS Access Key ID:',
            validate: function (result) {
                if (result.length < 3) {
                    return 'Must be set.'
                }
                return true
            }
        },
        {
            type: 'password',
            name: 'aws_secret_access_key',
            message: 'AWS Secret Access Key:',
            mask: '*',
            validate: function (result) {
                if (result.length < 3) {
                    return 'Must be set.'
                }
                return true
            }
        },
        {
            type: 'list',
            name: 'region',
            message: 'Default region name:',
            choices: TFRegionList
        }
    ];

    prompt(inputs).then(answers => {
        configureProfile(answers);
    })
}