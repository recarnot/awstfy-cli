const shell = require('shelljs');
const { logError } = require('./helper');
const ini = require('ini');
const path = require('path');
const os = require('os');
const fs = require('fs');

exports.hasContext = function() {

    if(!shell.test('-f', 'context.tf')) {
        logError('Context not configured ! Please use configure command')        
        return false
    }
    return true;
}

exports.getAWSProfiles = function() {
    
    const dotAWSDirPath = path.normalize(path.join(os.homedir(), '.aws'));
    const credentialsFilePath = path.join(dotAWSDirPath, 'credentials');

    let credentials = {};
    if (fs.existsSync(credentialsFilePath)) {
        credentials = ini.parse(fs.readFileSync(credentialsFilePath, 'utf-8'));
    }

    let names = [];
    for(profile in credentials) {
        names.push(profile);
    }
    names = names.sort();

    return names;
}