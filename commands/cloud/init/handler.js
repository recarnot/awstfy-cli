const { saveConfig } = require("../../../tools/config");
const { cloudManager } = require("../../../managers/cloud_manager");
const { logSuccess } = require("../../../tools/helper");

exports.configureCloud = function(conf) {
    saveConfig('cloud_hostname', conf.cloud_hostname);
    saveConfig('cloud_token', conf.cloud_token);
    saveConfig('cloud_organization', conf.cloud_organization);
    saveConfig('cloud_organizations', conf.cloud_organizations);

    cloudManager.init(conf);
    logSuccess('Terraform Cloud initialized.')
}