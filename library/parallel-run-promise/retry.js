const task1 = () => new Promise((res, rej) => setTimeout(() => {
  console.log(1);
  res();
}, 500));
const task2 = () => new Promise((res, rej) => setTimeout(() => {
  console.log(2);
  res();
}, 300));
const task3 = () => new Promise((res, rej) => setTimeout(() => {
  console.log(3);
  rej();
}, 400));
const task4 = () => new Promise((res, rej) => setTimeout(() => {
  console.log(4);
  res();
}, 100));
const task5 = () => new Promise((res, rej) => setTimeout(() => {
  console.log(5);
  rej();
}, 200));

const tasks = [task1, task2, task3, task4, task5];
const concurrency = 3;
const retry = 5;

const onComplete = (successTaskCount, errorTaskCount) => {
  debugger;
};

const main = () => {
  let successTaskCount = 0;
  let errorTaskCount = 0;
  const totalTaskCount = tasks.length;

  // 处理事件：所有任务都执行完
  const complete = () => {
    if (successTaskCount + errorTaskCount < totalTaskCount) {
      return;
    }
    onComplete(successTaskCount, errorTaskCount);
  };

  // 处理事件：任务执行成功
  const success = () => {
    successTaskCount++;

    const task = tasks.shift();
    if (task == null) {
      // 任务队列都清空
      // 也许还有正在重试的任务，仍在执行中
      complete();
      return;
    }
    task().then(success, () => createErrorHandler(task, 0));
  };

  // 处理事件：任务执行失败
  const createErrorHandler = (task, hasRetried) => {
    if (hasRetried >= retry) {
      // 多次重试失败
      errorTaskCount++;
      complete();
      return;
    }
    task().then(success, () => createErrorHandler(task, ++hasRetried));
  };

  // 按最大并发数一次性启动
  for (let i = 0; i < concurrency; i++) {
    const task = tasks.shift();

    // 对任务执行的结果统一处理
    task().then(success, () => createErrorHandler(task, 0));
  }
};

main();