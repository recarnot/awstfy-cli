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
        console.info('SETUP');
        try {
            this._om.setupShellInitFile();
            return true;
        } catch (err) {
            console.info('ERROR setup ', err);
        }

        console.info('SETUP END');
        return false;
    }
}

const comManager = new CompletionManager();
exports.completionManager = comManager;
