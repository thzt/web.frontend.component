(function (global) {
    global.stepExecutor = {
        create: function () {
            var stepCollection = arguments[0];

            return new StepExecutor(stepCollection);
        }
    };

    function StepExecutor(stepCollection) {
        var executor = this;

        executor.stepCollection = stepCollection;
        return executor;
    }

    StepExecutor.prototype = {
        constructor: StepExecutor,

        begin: function () {
            var executor = this,

                stepName = arguments[0].stepName,
                value = arguments[0].value,

                next = function () {
                    executor.begin.apply(executor, arguments);
                };

            executor.stepCollection[stepName].call(executor, value, next);
        }
    };
} (this));