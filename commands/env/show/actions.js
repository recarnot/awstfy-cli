const { logSuccess } = require('../../../tools/helper');
const { getSelectedWorkspace } = require('../workspace');

exports.callEnvShow = function() {
    logSuccess("Terraform workspace: " + getSelectedWorkspace());
}
