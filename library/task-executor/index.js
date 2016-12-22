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

        executor.timer = null;
        executor.task = null;
        executor.nextValue = null;

        executor.isWaiting = false;
        executor.pauseNext = false;

        return executor;
    }

    TaskExecutor.prototype = {
        constructor: TaskExecutor,

        begin: function (initialValue, task) {
            var executor = this;

            executor.task = task;
            executor.nextValue = initialValue;

            executor.task.call(executor, executor.nextValue, next.bind(executor));
            return this;
        },
        pause: function () {
            var executor = this;

            if (executor.isWaiting) {
                global.clearTimeout(executor.timer);
                return this;
            }

            executor.pauseNext = true;
            return this;
        },
        resume: function (value) {
            var executor = this;

            value !== undefined && (executor.nextValue = value);
            executor.pauseNext = false;

            if (executor.isWaiting) {
                executor.isWaiting = false;
                executor.task.call(executor, executor.nextValue, next.bind(executor));
                return this;
            }

            return this;
        }
    };

    function next(nextValue) {
        var executor = this;

        executor.nextValue = nextValue;
        executor.isWaiting = true;

        if (executor.pauseNext) {
            return;
        }

        executor.timer = setTimeout(function () {
            executor.isWaiting = false;
            executor.task.call(executor, executor.nextValue, next.bind(executor));
        }, executor.interval);
    }
}(this));
