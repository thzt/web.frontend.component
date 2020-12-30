/**
 * 运行任务的方法
 * 
 * @tasks [()=>promise] lazy 的异步任务
 * @concurrency 最大并发数
 * @retry 最大重试次数
 * 
 * @param callback 任务执行完的回调
 */
const run = ({ tasks, concurrency, retry }, callback) => {
  // 总共任务数
  const taskCount = tasks.length;

  // 最终的返回值
  const results = [];

  // 改变一下原始的 tasks 结构，多增加一些字段
  const mapTasks = tasks.map((task, i) => ({
    index: i,  // 第几个任务
    task,      // 要跑的任务
  }));

  // 任务是否执行完
  const isComplete = (results, n) => [...Array(n).keys()].every(i => results.hasOwnProperty(i));

  /**
   * task 调用成功回调
   * 
   * @param v task 返回值
   * @param i 第几个 task
   */
  const success = (v, i) => {
    results[i] = {
      success: true,
      value: v,
    };

    if (isComplete(results, taskCount)) {
      callback(results);
      return;
    }

    // 没有待执行的任务，就直接返回
    if (mapTasks.length === 0) {
      return;
    }

    const { task, index } = mapTasks.shift();
    const r = 0;  // 新任务当前重试次数为 0

    // 跑下一个任务
    task().then(
      v => success(v, index),
      err => failed(err, index, r, task),
    );
  };

  /**
   * task 调用失败回调
   * 
   * @param err 失败原因
   * @param i 第几个 task
   * @param r 当前重试了几次
   * @param task 哪个任务失败了
   */
  const failed = (err, i, r, task) => {
    if (r > retry) {
      // 超过重试次数，就直接存入任务失败

      results[i] = {
        success: false,
        error: err,
      };

      // 存入后，判断如果任务执行完了，就直接返回
      if (isComplete(results, taskCount)) {
        callback(results);
        return;
      }
    }

    // 还不到重试次数，就重试当前任务，retry 加一
    task().then(
      v => success(v, i),
      err => failed(err, i, r + 1, task),
    );
  };

  // 先取出 concurrency 个任务并发的跑
  for (let i = 0; i < concurrency; i++) {
    const { index, task } = mapTasks.shift();
    const r = 0;  // 新任务当前重试次数为 0

    ((index) => {
      // 闭包拿到当前循环的 index

      // 跑完不论成功还是失败，统一处理
      task().then(
        v => success(v, index),
        err => failed(err, index, r, task),
      );
    })(index);
  }
};

// ---- ---- ---- ---- ---- ---- ---- ---- ----

// 主函数
const main = async () => {
  const tasks = [
    () => request(0),
    () => request(1),
    () => request(2),
    () => request(3),
    () => request(4),
  ];

  const results = await new Promise(res => run({
    tasks,
    concurrency: 3,
    retry: 2,
  }, res));

  debugger;
};

// 模拟一个异步任务
const request = async data => {
  const response = await new Promise((res, rej) => {
    const t = Math.ceil(Math.random() * 10);

    setTimeout(() => {
      // 偶数成功
      if (data % 2 === 0) {
        res(data);
        return;
      }

      // 奇数失败
      rej(data);
    }, 100 * t);
  });
  return response;
};

main();