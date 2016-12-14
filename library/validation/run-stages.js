import runStage from './run-stage';

export default function runStages(stages, data) {
    let fnThis = this,
        collectError = false,
        messages = [];

    stages.some(stage => {
        // return false: next item
        // return true: break

        let continueAlthoughError = stage.continue,
            stageConfig = {
                when: stage.when,
                collect: {
                    error: stage.collect.error,
                    success: stage.collect.success
                },
            },
            {triggerError, errorMessage, successMessage} = runStage.call(fnThis, stageConfig, data);

        if (triggerError) {
            messages.push({ error: errorMessage, success: successMessage });
            collectError = true;
        }

        if (!collectError) {
            return false;
        }

        if (continueAlthoughError) {
            return false;
        }

        return true;
    });

    return {
        collectError,
        messages
    };
}