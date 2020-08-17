const { getInfo, logInfo } = require("../../tools/helper");

exports.callVersion = function() {
    logInfo(getInfo().name + ': ' + getInfo().version);
    console.info('');
}
