const parallelRunPromise = (lazyPromises, n = 3) => {
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
    ]);
    console.log(results);  // ["a", "b", "c", "d", "e"] 6006.042724609375ms
    console.timeEnd('main');
  };

  main();
*/