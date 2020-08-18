const { prompt } = require('inquirer');
const { clone } = require('./handler');
const shell = require('shelljs');

exports.callClone = function () {
    var inputs = [
        {
            type: 'input',
            name: 'repository',
            message: 'Enter the name of the repository:',
            validate: function (result) {
                if (result.length < 3) {
                    return 'Must be set.'
                }
                return true
            }
        },
    ];

    if (!shell.which('git')) {
        shell.echo('Sorry, this tool requires git');
        shell.exit(1);
    }

    prompt(inputs).then(answers => {
        clone(answers);
    })
}