const shell = require('shelljs');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const colors = require('colors/safe');
const Table = require('cli-table3');
const { logSuccess, logWarning } = require('./helper');
const { renderTemplateFile } = require('template-file')

exports.saveFile = function (template_name, data, destination_name, label, force= true, show=true) {
    var template = path.dirname(fs.realpathSync(__filename)) + "/../templates/" + template_name
    var destination = process.cwd() + "/" + destination_name
    var inputs = {
        type: 'confirm',
        name: 'confirm',
        message: "Overwrite this resource ?" 
    };
    
    if(!force && shell.test('-f', destination)) {
        logWarning(label + " '" + data.id + "' already exist.");
        
        inquirer.prompt(inputs).then(answers => {
            if(answers.confirm) {
                writeFile(template, data, destination);
            }
        });
    } else writeFile(template, data, destination, label, show);
}

function writeFile(template, data, destination, label="Resource", show=true) {
    try {
        renderTemplateFile(template, data)
            .then(renderedString => fs.writeFileSync(destination, renderedString, (err) => {
                if (err) {
                    console.error(err)
                    throw err;
                }
            }));
    } catch(err) {
        console.error(err);
        return;
    }
    
    if(show) {
        logSuccess(`${label} configured`);
        printData(data);
    }
}

function printData(data) {
    var cells = [];

    for (key in data) {
        cells.push([colors.gray(key + ':'), colors.gray(data[key])]);
    }

    var t;
    t = new Table({
        chars: CLI_TABLE_COMPACT,
    });
    t.push(...cells);
    
    console.log(t.toString());
}

const CLI_TABLE_COMPACT = {
    top: '',
    'top-mid': '',
    'top-left': '',
    'top-right': '',
    bottom: '',
    'bottom-mid': '',
    'bottom-left': '',
    'bottom-right': '',
    left: ' ',
    'left-mid': '',
    mid: '',
    'mid-mid': '',
    right: '',
    'right-mid': '',
    middle: ' ',
};