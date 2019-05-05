/*
  思路：
    使用一个working变量记录当前正在运行的promise数

    程序一开始执行时，启动n个promise
    这n个promise中任一个执行完后，会继续启动新的promise，只要working数不超过n
*/
const parallelRunPromise = (lazyPromises, n) => {
  const results = [];
  let index = 0;
  let working = 0;
  let complete = 0;

  const addWorking = (res, rej) => {
    while (working < n && index < lazyPromises.length) {
      const current = lazyPromises[index++];
      working++;

      ((index) => {
        current().then(result => {
          working--;
          complete++;
          results[index] = result;

          if (complete === lazyPromises.length) {
            res(results);
            return;
          }

          // note: 虽然addWorking中有while，这里其实每次只会加一个promise
          addWorking(res, rej);
        }, rej);
      })(index - 1);
    }
  };

  return new Promise(addWorking);
};

module.exports = parallelRunPromise;

/*
  const main = async () => {
    console.time('main');
    const results = await parallelRunPromise([
      () => new Promise((res, rej) => setTimeout(() => res('a'), 1000)),
      () => new Promise((res, rej) => setTimeout(() => res('b'), 3000)),
      () => new Promise((res, rej) => setTimeout(() => res('c'), 2000)),
      () => new Promise((res, rej) => setTimeout(() => res('d'), 5000)),
      () => new Promise((res, rej) => setTimeout(() => res('e'), 4000)),
    ], 3);
    console.log(results);  // ["a", "b", "c", "d", "e"] 6006.042724609375ms
    console.timeEnd('main');
  };

  main();
*/