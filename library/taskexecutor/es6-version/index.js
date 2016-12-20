const taskExecutor = {
    create({interval}) {
        return new TaskExecutor(interval);
    }
};

// tools

class TaskExecutor {
    constructor(interval) {
        let executor = this;

        executor.interval = interval;

        executor.timer = null;
        executor.task = null;
        executor.nextValue = null;

        executor.isWaiting = false;
        executor.pauseNext = false;
    }

    begin(initialValue, task) {
        let executor = this;

        executor.task = task;
        executor.nextValue = initialValue;

        executor.task.call(executor, executor.nextValue, next.bind(executor));
        return this;
    }

    pause() {
        let executor = this;

        if (executor.isWaiting) {
            global.clearTimeout(executor.timer);
            return this;
        }

        executor.pauseNext = true;
        return this;
    }

    resume(value) {
        let executor = this;

        value !== undefined && (executor.nextValue = value);
        executor.pauseNext = false;

        if (executor.isWaiting) {
            executor.isWaiting = false;
            executor.task.call(executor, executor.nextValue, next.bind(executor));
            return this;
        }

        return this;
    }
}

function next(nextValue) {
    let executor = this;

    executor.nextValue = nextValue;
    executor.isWaiting = true;

    if (executor.pauseNext) {
        return;
    }

    executor.timer = setTimeout(() => {
        executor.isWaiting = false;
        executor.task.call(executor, executor.nextValue, next.bind(executor));
    }, executor.interval);
}

export default taskExecutor;