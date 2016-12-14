export default function runStage(stageConfig, data) {
    let fnThis = this,
        isSatisfyCondition = stageConfig.when.apply(fnThis, data.when);

    if (!isSatisfyCondition) {
        return {
            triggerError: false
        };
    }

    let errorMessage = stageConfig.collect.error
        && stageConfig.collect.error.apply(fnThis, data.collect.error),

        successMessage = stageConfig.collect.success
            && stageConfig.collect.success.apply(fnThis, data.collect.success);

    return {
        triggerError: stageConfig.collect.error != null,
        errorMessage,
        successMessage
    };
}