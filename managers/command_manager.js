class CommandManager {
    static __instance;

    static getInstance() {
        if(!CommandManager.__instance) this.__instance = new CommandManager();

        CommandManager.__instance;
        
        return CommandManager.__instance;
    }

    _program;

    constructor(program) {
        this._program = program;
    }

    get program() {
        return this._program;
    }

    init(program) {
        this._program = program;
    }

    test() {
        console.info('test');
    }

}
exports.commandManager = CommandManager.getInstance();
