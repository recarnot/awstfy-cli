const inquirer = require('inquirer');
const { hasContext } = require('../../../tools/context');
const { s3Action } = require('./action_s3');
const { efsBaseAction } = require('./action_efs');

function typeAction(force) {
    var storage_inputs = {
        type: 'list',
        name: 'type',
        message: 'Choose the Type of storage to create:',
        choices: [
            {
                name: 'S3 Bucket',
                value: 's3'
            },
            {
                name: 'EFS volume',
                value: 'efs'
            }
        ],
    }

    inquirer.prompt(storage_inputs).then(answers => {
        switch (answers.type) {
            case 's3':
                s3Action(force);
                break;
            case 'ebs':
                break;
            case 'efs':
                efsBaseAction(force);
                break;
        }
    })
}

function action(opts) {
    var force = opts.force || false;

    if (hasContext()) {
        typeAction(force);
    }
}
exports.callStorage = action