
var TFVariable = require('../variable');
const { workspaceModel } = require('../../../managers/workspaces_manager');
const { logSuccess } = require('../../../tools/helper');

exports.addVariable = function(conf) {
    var variable = TFVariable.create(conf);

    workspaceModel.addVariable(variable);

    logSuccess('Variable created');
}
