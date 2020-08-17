const { prompt } = require('inquirer');
const { hasContext } = require('../../../tools/context');
const { configureDNSZone } = require('./handler');

var inputs = [
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
        name: 'name',
        message: 'Enter the name of the hosted zone:',
        validate: function(result) {
            if(result.length < 1) {
                return 'Must be set.'
            }
            return true
        }
    },
    {
        type: 'list',
        name: 'type',
        message: 'Choose the hosted zone type:',
        choices: ['public', 'private']
    },
    {
        type: 'input',
        name: 'comment',
        message: 'Enter a description:',
        default: 'Managed by Terraform',
    },
    {
        type: 'confirm',
        name: 'force_destroy',
        message: 'Do you want to force the destroy process (remove all records):'
    },
    {
        type: 'input',
        name: 'vpc_id',
        message: 'VPC Id:',
        when: function(answers) {
            if(answers.type == 'public') return false;
            return true;
        }
    },
    {
        type: 'input',
        name: 'vpc_region',
        message: 'VPC region:',
        when: function(answers) {
            if(answers.type == 'public') return false;
            return true;
        }
    }
];

function action(opts) {
    var force = opts.force || false;
    
    if(hasContext()) {
        prompt(inputs).then(answers => {
            configureDNSZone(answers, force)
        })
    }
}
exports.callDNSZone = action
