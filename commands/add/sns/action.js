const { prompt } = require('inquirer');
const { hasContext } = require('../../../tools/context');
const { configureSNS } = require('./handler');

var sns_inputs = [
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
        name: 'prefix',
        message: 'Enter the name prefix:',
        validate: function(result) {
            if(result.length < 1) {
                return 'Must be set.'
            }
            return true
        }
    },
    {
        type: 'input',
        name: 'display',
        message: 'Enter the display name (optional):',
    }
];

function action(opts) {
    var force = opts.force || false;
    
    if(hasContext()) {
        prompt(sns_inputs).then(answers => {
            configureSNS(answers, force)
        })
    }
}
exports.callSNS = action