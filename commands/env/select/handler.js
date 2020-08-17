const shell = require('shelljs');
const { logSuccess, logError } = require('../../../tools/helper');
const { selectWorkspace } = require('../workspace');

exports.configureSelectEnv = function(conf) {
    selectWorkspace(conf.name);
}
