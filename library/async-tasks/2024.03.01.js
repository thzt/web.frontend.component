const createTask = () => {
  const task = () => {
    // 随机执行时间，随机成功和失败
    const promise = new Promise((res, rej) => {
      const timer = Math.random() * 1000;
      const isFailed = Math.floor(Math.random() * 10) % 2 === 0;

      setTimeout(() => {
        if (isFailed) {
          console.log(`task failed: ${timer}`);
          rej(timer);
          return;
        }

        console.log(`task success: ${timer}`);
        res(timer);
      }, timer);
    });

    return promise;
  };

  // 返回一个任务，任务执行的方式为 task();
  return task;
};

const tasks = [
  createTask(),
  createTask(),
  createTask(),
  createTask(),
];

const run = ({ tasks, concurrency, retry, callback }) => {
  const results = [];
  const taskCount = tasks.length;
  let curIndex = 0;

  const exec = () => {
    for (let i = 0; i < concurrency; i++) {
      const task = tasks.shift();

      ((index) => {
        task.retryCount = 0;
        task().then(
          val => success(val, index, task),
          err => failed(err, index, task),
        );

        curIndex++;
      })(i);
    }
  };

  const isComplete = () => {  // 用结果是否都已经保存了，来判断是否执行完了
    for (let i = 0; i < taskCount; i++) {
      if (results[i] == null) {
        return false;
      }
    }

    return true;
  };

  // 任务执行成功
  const success = (val, index, task) => {
    const result = {
      success: true,
      value: val,
      index,
    };

    results[index] = result;

    if (isComplete()) {
      callback(results);
      return;
    }

    if (tasks.length === 0) {  // 如果没有全新的任务
      return;
    }
    const nextTask = tasks.shift();

    ((index) => {  // 用闭包保存当前值，success/failed 回调才能拿到正确的值
      nextTask.retryCount = 0;
      nextTask().then(
        val => success(val, index, nextTask),
        err => failed(err, index, nextTask),
      );

      curIndex++;
    })(curIndex);
  };

  // 任务执行失败
  const failed = (err, index, task) => {
    if (task.retryCount < retry) {  // 判断 retry 次数是否已超
      task.retryCount++;
      task().then(
        val => success(val, index, task),
        err => failed(err, index, task),
      );
      return;
    }

    const result = {
      success: false,
      error: err,
      index,
    };
    results[index] = result;

    if (isComplete()) {  // 任务失败也要判定是否执行完
      callback(results);
      return;
    }
  };

  exec();
};

debugger
run({
  tasks,
  concurrency: 3,
  retry: 1,
  callback: results => {
    debugger
  },
});
debugger