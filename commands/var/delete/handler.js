const { workspaceModel } = require('../../../managers/workspaces_manager');
const { logSuccess } = require('../../../tools/helper');

exports.deleteVariable = function(conf) {
    workspaceModel.deleteVariable(conf.name);

    logSuccess('Variable deleted');
}