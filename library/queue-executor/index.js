(function (global) {
    global.quequeExecutor = {
        create: function () {
            return new QueueExecutor();
        }
    };

    function QueueExecutor() { }

    QueueExecutor.prototype = {
        constructor: QueueExecutor,

        begin: function () {
            var instance = this,
                taskQueue = arguments[0].queue,
                currentValue = arguments[0].value,

                task = taskQueue.shift(),
                next = function (value) {
                    if (taskQueue.length === 0) {
                        return;
                    }

                    instance.begin.call(instance, {
                        queue: taskQueue,
                        value: value
                    });
                };

            task.call(instance, currentValue, next);
        }
    };
} (window));