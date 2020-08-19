const omelette = require("omelette");
const { getInfo } = require("../tools/helper");

class CompletionManager {
    constructor() { }

    _om;

    init() {
        try {
            this._om = omelette(getInfo().name);
            this._om.tree({
                configure: {},
                provider: {},
                backend: {},
                version: {},
                init: {},
                plan: ['-varfile=', '-input='],
                apply: {},
                destroy: {},
                profile: ['list', 'configure'],
                env: ['select', 'list', 'show', 'new'],
                var: ['add', 'list', 'update', 'delete'],
                cloud: ['init'],
                add: ['vpc', 'storage', 'sns', 'dns', 'state', 'provider'],
            }).init();
        }catch(err) {

        }
    }

    setup() {
        try {
            this._om.setupShellInitFile();
        } catch (err) {
            return false;
        }

        return true;
    }
}

const comManager = new CompletionManager();
exports.completionManager = comManager;
