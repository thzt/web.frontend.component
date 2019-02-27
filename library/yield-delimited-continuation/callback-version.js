// https://dev.to/yelouafi/algebraic-effects-in-javascript-part-3---delimited-continuations-42hj

(() => {
  const yieldDelimitedContinuation = (gen, cont) => {
    const reset = gen => {

      // 返回一个新generator，它除了参数多了shift之外，执行效果和gen一样
      const childGen = function* () {
        return yield* gen(shift);
      };
      childGen.isReset = true;
      return childGen;
    };

    const shift = gen => {
      gen.isShift = true;
      return gen;
    };

    // 把reset当做形参传入
    const iter = gen(reset);

    // 把当前iter的continuation存起来
    iter.cont = cont;

    // 递归调用
    engine(iter, null, cont);
  }

  const engine = (iter, init, cont) => {
    // next调用会导致yield表达式返回
    const { done, value } = iter.next(init);
    if (done) {
      cont(value);
      return;
    }

    // 本例中，yield后面可以是一个数字，或者一个generator

    // yield一个数字
    if (typeof value !== 'function') {
      engine(iter, value, cont);
      return;
    }

    // yield一个generator
    const childGen = value;
    const childIter = childGen();

    // 添加当前iter对父级iter的引用
    childIter.parent = iter;
    // 添加是否reset标志
    childIter.isReset = childGen.isReset;
    // 把当前iter的continuation存起来
    childIter.cont = cont;

    engine(childIter, null, childResult => {
      // 如果是shift函数，则回溯到reset的父级iter，从那里往下执行
      if (childGen.isShift) {

        // 找到reset的父级iter
        let rootIter = iter;
        while (!rootIter.isReset) {
          rootIter = rootIter.parent;
        }

        // 从父级iter那里开始执行，传入父级iter的continuation
        engine(rootIter.parent, childResult, rootIter.parent.cont);
        return;
      }

      // 否则继续执行当前iter的下一步操作
      engine(iter, childResult, cont);
    });
  };

  window.yieldDelimitedContinuation = yieldDelimitedContinuation;
})();
