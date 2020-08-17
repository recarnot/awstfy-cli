const shell = require('shelljs');
const { logSuccess, logError } = require('../../../tools/helper');
const { createWorkspace } = require('../workspace');

exports.configureNewEnv = function(conf) {
    createWorkspace(conf.name);
}
