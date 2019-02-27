// https://dev.to/yelouafi/algebraic-effects-in-javascript-part-3---delimited-continuations-42hj

(() => {
  const yieldDelimitedContinuation = gen => {
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

    // 递归调用
    return engine(iter, null);
  }

  const engine = (iter, init) => {
    // next调用会导致yield表达式返回
    const { done, value } = iter.next(init);
    if (done) {
      return value;
    }

    // 本例中，yield后面可以是一个数字，或者一个generator

    // yield一个数字
    if (typeof value !== 'function') {
      return engine(iter, value);
    }

    // yield一个generator
    const childGen = value;
    const childIter = childGen();

    // 添加当前iter对父级iter的引用
    childIter.parent = iter;
    // 添加是否reset标志
    childIter.isReset = childGen.isReset;

    const childResult = engine(childIter, null);

    // 如果是shift函数，则回溯到reset的父级iter，从那里往下执行
    if (childGen.isShift) {

      // 找到reset的父级iter
      let rootIter = iter;
      while (!rootIter.isReset) {
        rootIter = rootIter.parent;

        // 沿途标记所有的iter为终止状态
        rootIter.isTermiate = true;
      }

      // 父级iter也设置为终止
      rootIter.parent.isTermiate = true;

      // 从父级iter那里开始执行
      return engine(rootIter.parent, childResult);
    }

    // 递归回溯时，如果发现当前iter已经被终止了，就直接返回
    if (iter.isTermiate) {
      return childResult;
    }

    // 否则继续执行当前iter的下一步操作
    return engine(iter, childResult);
  };

  window.yieldDelimitedContinuation = yieldDelimitedContinuation;
})();
