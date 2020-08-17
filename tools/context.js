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
