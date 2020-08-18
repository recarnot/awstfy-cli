const { loadConfig } = require("../tools/config");

class CloudManager {
    constructor() {
        var conf = {
            cloud_hostname: loadConfig('cloud_hostname', null),
            cloud_organization: loadConfig('cloud_organization', null),
            cloud_organizations: loadConfig('cloud_organizations', []),
        }
        this.init(conf);
    }

    _organization = null;
    _organizations = [];
    
    init(conf) {
        this._organization = conf.cloud_organization;
        this._organizations = conf.cloud_organizations;
    }

    get organization() {
        return this._organization;
    }

    get organizations() {
        return this._organizations;
    }
}

const cmanager = new CloudManager();
exports.cloudManager = cmanager;
