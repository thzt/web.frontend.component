import collectMessage from './collect-message';

class Validation {
    constructor(config) {
        let instance = this;
        instance._config = config;
    }

    run(data, fnThis) {
        let instance = this,
            config = instance._config;

        return collectMessage.call(fnThis, config, data);
    }
}

export default Validation;

