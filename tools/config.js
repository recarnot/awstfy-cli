const fs = require('fs');
const path = require('path');
const Configstore = require('configstore');
const { getInfo } = require('./helper');

const folder = encodeURIComponent(process.cwd())
const config = new Configstore(folder);

exports.saveConfig = function(key, value) {
    config.set(key, value)
}

exports.loadConfig = function(key, default_value) {
    var result = config.get(key)
    
    if(result != undefined) {
        return result
    }
    return default_value
}

exports.getLocalConfigPath = function() {
    return process.cwd() + '/.' + getInfo().name;
}

exports.getWorkspaceConfigPath = function() {
    return process.cwd() + '/.' + getInfo().name + '/workspaces.json';
}

exports.cleanConfig = function(k) {
    config.clear();
}