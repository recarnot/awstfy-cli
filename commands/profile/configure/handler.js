const { profileManager } = require("../../../managers/profiles_manager");
const { logSuccess, logError } = require("../../../tools/helper");

exports.configureProfile = function (conf) {
    try {
        profileManager.configure(conf);
        logSuccess(`AWS Profile '${conf.name}' configured.`)
    } catch (err) {
        logError("AWS Profile configuration failed!");
    }
}