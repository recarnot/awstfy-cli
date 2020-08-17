const TFVariable = require("../variable");
const { workspaceModel } = require("../../../managers/workspaces_manager");
const { logSuccess } = require("../../../tools/helper");

exports.updateVariable = function(conf) {
    var variable = TFVariable.create(conf);

    workspaceModel.updateVariable(variable);

    logSuccess('Variable updated');
}