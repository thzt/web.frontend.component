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

			return this;
        },
        pause: function () {
            var executor = this;

            if (executor.isPause) {
                return this;
            }

            global.clearTimeout(executor.timer);

            executor.isPause = true;
            executor.timer = null;

			return this;
        },
        resume: function () {
            var executor = this;

            executor.begin.call(executor, executor.value, executor.task);
			return this;
        },
        stop: function () {
            var executor = this;

            global.clearTimeout(executor.timer);

            executor.isPause = null;
            executor.timer = null;
            executor.value = null;
            executor.task = null;

			return this;
        }
    };
} (this));
