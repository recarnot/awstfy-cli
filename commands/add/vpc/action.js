const { prompt } = require('inquirer');
const { configureVPC } = require('./handler');
const { hasContext } = require('../../../tools/context');

var vpc_inputs = [
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
        name: 'cidr_block',
        message: 'Cidr block:',
        default: '10.0.0.0/16'
    },
    {
        type: 'list',
        name: 'az',
        message: 'Choose the number of availability zones to use:',
        default: '3',
        choices: [
            {
                name: '1',
                value: '1'
            },
            {
                name: '2',
                value: '2'
            },
            {
                name: '3',
                value: '3'
            },
        ]
    },
    {
        type: 'checkbox',
        name: 'nat',
        message: 'NAT configuration:',
        choices: [
            {
                name: 'enabled',
                value: '0'
            },
            {
                name: 'High Availability',
                value: '1'
            },
        ],
    },
    {
        type: 'checkbox',
        name: 'options',
        message: 'Options:',
        choices: [
            {
                name: 'Enable DNS support',
                value: 'dns_support',
                checked: true
            },
            {
                name: 'Enable DNS Hostnames',
                value: 'dns_hostnames',
                checked: true
            },
            {
                name: 'Map Public IP on launch',
                value: 'public_ip'
            }
        ]
    }
];

function action(opts) {
    var force = opts.force || false;

    if(hasContext()) {
        prompt(vpc_inputs).then(answers => {
            configureVPC(answers, force)
        })
    }
}
exports.callVPC = action