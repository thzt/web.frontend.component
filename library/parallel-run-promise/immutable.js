const sequence = async runningPromises => {
  // 为每一个promise加上它在runningPromises中的索引i
  const promises = runningPromises.map(async (runningPromise, i) => [await runningPromise, i]);

  // 找出率先完成的那个promise
  const [result, i] = await Promise.race(promises);

  // 去掉位置i的promise
  const otherRunningPromises = runningPromises.slice(0, i).concat(runningPromises.slice(i + 1));

  // result: 率先完成的promise的结果
  // otherRunningPromises: 其余的正在运行的promise
  return [result, otherRunningPromises];
};

// runningPromises: 正在运行的promise
// index: 当前执行过了lazyPromises中的哪些promise
const run = async (lazyPromises, runningPromises, index) => {
  if (runningPromises.length === 0) {
    return [];
  }

  // 找出率先完成的那个promise
  const [result, otherRunningPromises] = await sequence(runningPromises);

  // 如果lazyPromises中所有的promise都已执行了
  if (index >= lazyPromises.length) {
    // 递归调用，并维持索引不变
    const results = await run(lazyPromises, otherRunningPromises, index);
    return [result, ...results];
  }

  // 再从lazyPromises拿出一个promise执行
  const [nextLazyPromise] = lazyPromises.slice(index, index + 1);
  const nextRunningPromise = nextLazyPromise();

  // 加到正在运行的promise列表中
  const newRunningPromises = otherRunningPromises.concat(nextRunningPromise);

  // 递归调用，索引加一
  const results = await run(lazyPromises, newRunningPromises, index + 1);
  return [result, ...results];
}

// size: 最大并发数
const parallel = async (lazyPromises, size) => {
  // 把序号和以后resolve的值组合起来，便于之后按lazyPromises的顺序展示结果
  const indexedLazyPromises = lazyPromises.map((lazyPromise, index) => async () => {
    const promise = lazyPromise();
    const result = await promise;
    return [result, index];
  });

  const preparePromises = indexedLazyPromises.slice(0, size);
  const runningPromises = preparePromises.map(lazyPromise => lazyPromise());
  const results = await run(indexedLazyPromises, runningPromises, size);

  // 按index进行排序
  const sortedResults = results.sort(([, xIndex], [, yIndex]) => {
    if (xIndex < yIndex) {
      return -1;
    }
    if (xIndex > yIndex) {
      return 1;
    }

    return 0;
  });

  // 转换最终结果
  return sortedResults.map(([result]) => result);
};

module.exports = parallel;

/*
  const main = async () => {
    console.time('main');

    const p1 = () => new Promise((res, rej) => setTimeout(() => res('a'), 1000));
    const p2 = () => new Promise((res, rej) => setTimeout(() => res('b'), 3000));
    const p3 = () => new Promise((res, rej) => setTimeout(() => res('c'), 2000));
    const p4 = () => new Promise((res, rej) => setTimeout(() => res('d'), 5000));
    const p5 = () => new Promise((res, rej) => setTimeout(() => res('e'), 4000));

    const k1 = [p1, p2, p3, p4, p5];

    // 最大并发数为3
    const results = await parallel(k1, 3);
    console.log(results);

    console.timeEnd('main');
  };

  main();  // ["a", "b", "c", "d", "e"] 6008.335693359375ms
*/
