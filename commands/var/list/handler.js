
const { workspaceModel } = require('../../../managers/workspaces_manager');
const { hasContext } = require('../../../tools/context');
const colors = require('colors/safe');
const Table = require('cli-table3');

exports.listVariable = function(conf) {
    if(hasContext()) {
        var cells = [];
        var info;

        for (const variable in workspaceModel.variables) {
            info = workspaceModel.variables[variable];
            cells.push([colors.gray(info.name), colors.gray(info.type), colors.gray(info.default), colors.gray(info.values), colors.gray(info.description)]);
        }

        var t;
        t = new Table({
            chars: CLI_TABLE_COMPACT,
            head: ['Name'.green, 'Type'.green, 'Default'.green, colors.green('Value'), 'Description'.green]
        });
        t.push(...cells);
        
        console.log(t.toString());
    }
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