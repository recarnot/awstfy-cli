const { TFResoureTemplate } = require('../../templates/template');
const { workspaceModel } = require('../../managers/workspaces_manager');

class TFVariable {
    constructor() {}

    name = '';
    type = '';
    description = '';
    default = '';
    condition = '';
    error_message = '';
    values = {};

    static create(conf) {
        var t = new TFVariable();
        t.name = conf.name || '';
        t.type = conf.type || '';
        t.description = conf.description || '';
        t.default = conf.default || '';
        t.condition = conf.condition || '';
        t.error_message = conf.error_message || '';

        for (const key in conf) {
            if(key.startsWith('value_')) {
                var ws = key.split('_')[1];
                t.values[ws] = conf[key];
            }
        }
        return t;
    }
    
    get(workspace) {
        return this.values[workspace]
    }
}
module.exports = TFVariable;


