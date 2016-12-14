import runStages from './run-stages';

function collectMessage(config, data) {
    let fnThis = this,
        {collectError, messages} = runStages.call(fnThis, config.stages, data);

    if (collectError) {
        return {
            error: true,
            messages
        };
    }

    let message = config.ifPass.apply(fnThis, data.ifPass);
    return {
        error: false,
        messages: [{ success: message }]
    };
};

export default collectMessage;