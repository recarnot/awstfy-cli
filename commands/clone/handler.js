const shell = require('shelljs');
const fs = require('fs');
const { logError, logSuccess, getInfo } = require('../../tools/helper');

exports.clone = function(conf) {
    shell.rm('-rf', `.${getInfo().name}`);
    shell.rm('-rf', 'env_*.tf*');
    
    var empty = fs.readdirSync(process.cwd()).length === 0;

    if(empty) {
        if (shell.exec(`git clone ${conf.repository} ./`).code !== 0) {
        logError('Error: Git clone failed');
        shell.exit(1);
        }
        logSuccess('Clone completed');
    } else logError('Current directory is not empty.');
}
