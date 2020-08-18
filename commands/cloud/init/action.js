const shell = require('shelljs');
const { prompt } = require('inquirer');
const { configureCloud } = require('./handler');
const { loadConfig } = require('../../../tools/config');
const { logError } = require('../../../tools/helper');

exports.callCloudInit = function () {
    var conf;

    var token_input = [
        {
            type: 'input',
            name: 'cloud_host',
            message: 'Enter the Terraform Cloud host name:',
            default: loadConfig('cloud_hostname', 'app.terraform.io'),
            validate: function (result) {
                if (result.length < 5) {
                    return 'Must be set.'
                }
                return true
            }
        },
        {
            type: 'password',
            name: 'cloud_token',
            message: 'Enter user token to authorize Terraform Cloud API Access:',
            mask: '*',
            default: loadConfig('cloud_token', null),
            validate: function (result) {
                if (result.length < 10) {
                    return 'Must be set.'
                }
                return true
            }
        }
    ]
    
    prompt(token_input).then(answers => {
        var token = answers.cloud_token;
        var hostname = answers.cloud_host.startsWith('https://') ? answers.cloud_host : `https://${answers.cloud_host}`;
        var api = '/api/v2/organizations';
        var request = `curl --header "Authorization: Bearer ${token}" --header "Content-Type: application/vnd.api+json" --request GET  ${hostname}${api}`
        var status = shell.exec(request, { silent: true });
        
        if(status.code > 0) {
            logError("Unables to process the request to Terraform Cloud using given informations, please check.");
            return;
        }

        var raw = JSON.parse(status.stdout);
        if(raw.hasOwnProperty('errors')) {
            logError("Authorization failed ! Please check your token.");
            return;
        }

        var data = JSON.parse(status.stdout).data;
        var organizations = [];
        
        for (const key in data) {
            var element = data[key];
            organizations.push(element.attributes.name);
        }

        organizations.sort();

        var conf = {
            cloud_hostname: answers.cloud_host,
            cloud_token: token,
            cloud_organization: null,
            cloud_organizations: organizations,
        }

        configureCloud(conf);
    });
}
