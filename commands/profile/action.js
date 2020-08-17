const { prompt } = require('inquirer');
const { configureNewProfile: configureProfile } = require('./handler');
const { TFRegionList } = require('../../constants.js');

var inputs = [
    {
        type: 'input',
        name: 'name',
        message: 'Name:',
        validate: function(result) {
            if(result.length < 3) {
                return 'Must be set.'
            }
            return true
        }
    },
    {
        type: 'input',
        name: 'aws_access_key_id',
        message: 'AWS Access Key ID:',
        validate: function(result) {
            if(result.length < 3) {
                return 'Must be set.'
            }
            return true
        }
    },
    {
        type: 'input',
        name: 'aws_secret_access_key',
        message: 'AWS Secret Access Key:',
        validate: function(result) {
            if(result.length < 3) {
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

exports.callCreateProfile = function() {
    prompt(inputs).then(answers => {
        configureProfile(answers);
    })
}