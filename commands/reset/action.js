const { prompt } = require('inquirer');
const colors = require('colors/safe');
const { resetProject } = require('./handler');
const { getInfo } = require('../../tools/helper');

exports.callReset = function () {
    console.info("RESET");

    var inputs = {
        type: 'input',
        name: 'confirm',
        default: 'no',
        message: colors.yellow(`(CAUTION) This command will removes all ${getInfo().name} and terraform configurations.\n  Are you sure ? (yes/no)`)
    }
    
    prompt(inputs).then(answers => {
        resetProject(answers);
    })
}