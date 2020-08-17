const { logSuccess } = require('../../../tools/helper');
const { getWorkspaces } = require('../workspace');

exports.callEnvList = function() {
    var separator = "\n  - ";
    logSuccess("Terraform workspaces: " + separator + getWorkspaces().join(separator));
}
