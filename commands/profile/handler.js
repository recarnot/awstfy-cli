const ini = require('ini');
const path = require('path');
const os = require('os');
const fs = require('fs');
const { logSuccess } = require("../../tools/helper");


exports.configureNewProfile = function(conf) {
    createAWSProfile(conf);
}

function createAWSProfile(data) {
    const dotAWSDirPath = path.normalize(path.join(os.homedir(), '.aws'));
    const credentialsFilePath = path.join(dotAWSDirPath, 'credentials');
    const configFilePath = path.join(dotAWSDirPath, 'config');

    var profileName = data.name;

    let credentials = {};
    if (fs.existsSync(credentialsFilePath)) {
        credentials = ini.parse(fs.readFileSync(credentialsFilePath, 'utf-8'));
    }
    let config = {};
    if (fs.existsSync(configFilePath)) {
        config = ini.parse(fs.readFileSync(configFilePath, 'utf-8'));
    }
    
    let credExist = false;
    Object.keys(credentials).forEach(key => {
        const keyName = key.trim();
        if (profileName === keyName) {
        credentials[key].aws_access_key_id = data.aws_access_key_id;
        credentials[key].aws_secret_access_key = data.aws_secret_access_key;
        credExist = true;
        }
    });
    if (!credExist) {
        credentials[profileName] = {
            aws_access_key_id: data.aws_access_key_id,
            aws_secret_access_key: data.aws_access_key_id,
        };
    }

    let configExist = false;
    Object.keys(config).forEach(key => {
        const keyName = key.replace('profile', '').trim();
        if (profileName === keyName) {
        config[key].region = data.region;
        configExist = true;
        }
    });
    if (!configExist) {
        const keyName = profileName === 'default' ? 'default' : `profile ${profileName}`;
        config[keyName] = {
            region: data.region
        };
    }
    
    fs.writeFileSync(credentialsFilePath, ini.stringify(credentials));
    fs.writeFileSync(configFilePath, ini.stringify(config));

    logSuccess(`Profile ${profileName} ok`);
}