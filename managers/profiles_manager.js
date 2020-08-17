const fs = require('fs');
const path = require('path');
const os = require('os');
const ini = require('ini');

class ProfileManager {
    constructor() {
        this.refresh();
    }

    _credentialsFilePath = os.homedir() + '/.aws/credentials';
    _configFilePath = os.homedir() + '/.aws/config';

    _credentials = {};
    _credential_names = [];
    _configs = {};

    list() {
        this.refresh();
        return this._credential_names;
    }

    configure(conf) {
        this.refresh();

        var profileName = conf.name.trim();

        let credExist = false;
        Object.keys(this._credentials).forEach(key => {
            const keyName = key.trim();
            if (profileName === keyName) {
                this._credentials[key].aws_access_key_id = conf.aws_access_key_id;
                this._credentials[key].aws_secret_access_key = conf.aws_secret_access_key;
                credExist = true;
            }
        });
        if (!credExist) {
            this._credentials[profileName] = {
                aws_access_key_id: conf.aws_access_key_id,
                aws_secret_access_key: conf.aws_secret_access_key,
            };
        }

        let configExist = false;
        Object.keys(this._configs).forEach(key => {
            const keyName = key.replace('profile', '').trim();
            if (profileName === keyName) {
                this._configs[key].region = conf.region;
                configExist = true;
            }
        });
        if (!configExist) {
            const keyName = profileName === 'default' ? 'default' : `profile ${profileName}`;
            this._configs[keyName] = {
                region: conf.region
            };
        }

        this._flush();
    }

    refresh() {
        if (fs.existsSync(this._credentialsFilePath)) {
            this._credentials = ini.parse(fs.readFileSync(this._credentialsFilePath, 'utf-8'));
        }

        if (fs.existsSync(this._configFilePath)) {
            this._configs = ini.parse(fs.readFileSync(this._configFilePath, 'utf-8'));
        }

        this._updateNames();
    }

    _updateNames() {
        this._credential_names = [];

        Object.keys(this._credentials).forEach(key => {
            this._credential_names.push(key.trim());
        });

        this._credential_names.sort();
    }

    _flush() {
        fs.writeFileSync(this._credentialsFilePath, ini.stringify(this._credentials));
        fs.writeFileSync(this._configFilePath, ini.stringify(this._configs));
    }
}

const pmanager = new ProfileManager();
exports.profileManager = pmanager;
