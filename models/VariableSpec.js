class VariableSpec {
    constructor(name) {
        this._name = "--" + name;
    }
    
    _name;
    value;

    get name() {
        return this._camelcase(this._name.replace('--', ''));
    };

    get option() {
        return this._name;
    };
    
    _camelcase(flag) {
        return flag.split('-').reduce((str, word) => {
            return str + word[0].toUpperCase() + word.slice(1);
        });
    }
}
module.exports = VariableSpec;


