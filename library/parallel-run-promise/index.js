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
  parallelRunPromise([
    () => new Promise((res, rej) => setTimeout(() => res(1), 500)),
    () => new Promise((res, rej) => setTimeout(() => res(2), 300)),
    () => new Promise((res, rej) => setTimeout(() => res(3), 200)),
    () => new Promise((res, rej) => setTimeout(() => res(4), 400)),
    () => new Promise((res, rej) => setTimeout(() => res(5), 100)),
  ]).then(console.log); // [1,2,3,4,5]
*/
