(function (global) {
    global.taskExecutor = {
        create: function () {
            var interval = arguments[0].interval;
            return new TaskExecutor(interval);
        }
    };

    function TaskExecutor(interval) {
        var executor = this;

        executor.interval = interval;

        executor.isPause = null;
        executor.timer = null;
        executor.value = null;
        executor.task = null;

        return executor;
    }

    TaskExecutor.prototype = {
        constructor: TaskExecutor,
        begin: function (initialValue, task) {
            var executor = this;

            executor.isPause = false;
            task(initialValue, function (nextValue) {
                executor.value = nextValue;
                executor.task = task;

                if (executor.isPause) {
                    return;
                }

                executor.timer = setTimeout(function () {
                    executor.begin.call(executor, nextValue, task);
                }, executor.interval);
            });
        },
        pause: function () {
            var executor = this;

            if (executor.isPause) {
                return;
            }

            global.clearTimeout(executor.timer);

            executor.isPause = true;
            executor.timer = null;
        },
        resume: function () {
            var executor = this;

            executor.begin.call(executor, executor.value, executor.task);
        },
        stop: function () {
            var executor = this;

            global.clearTimeout(executor.timer);

            executor.isPause = null;
            executor.timer = null;
            executor.value = null;
            executor.task = null;
        }
    };
} (this));