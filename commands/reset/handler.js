const shell = require('shelljs');
const { logSuccess, logError, logInfo, getInfo } = require("../../tools/helper");

exports.resetProject = function (conf) {
    if (conf.confirm === 'yes') {

        try {
            shell.rm('-rf', '*.tf*');
            shell.rm('-rf', 'terraform.tfstate.d');
            shell.rm('-rf', '.terraform');
            shell.rm('-rf', `.${getInfo().name}`);
            logSuccess("Cleaning completed.");
        } catch (err) {
            logError(err);
        }
    } else {
        logInfo("Reset process aborted.");
    }
}