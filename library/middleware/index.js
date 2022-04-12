class App {
  constructor() {
    this._middlewares = [];
  }

  addMiddleware(middleware) {
    this._middlewares.push(middleware);
  }

  run(initValue) {
    const middlewares = this._middlewares;
    const middleware = middlewares.shift();

    // 取出下一个 middleware，递归调用
    const next = value => {
      const nextMiddleware = middlewares.shift();
      if (nextMiddleware == null) {
        return;
      }

      return nextMiddleware(next, value);
    };

    // 从第一个 middleware 开始执行
    const iterator = middleware(next, initValue);
    while (true) {
      // 执行下一个 yield（不包括 yield*）
      const { done, value } = iterator.next();
      if (done) {
        return value;
      }
    }
  }
}

// 用例
const app = new App();

app.addMiddleware(function* (next, value) {
  yield 'a';
  console.log(1);
  const result = yield* next(value + 1);
  console.log(5);
  return result + 1;
});
app.addMiddleware(function* (next, value) {
  yield 'b';
  console.log(2);
  const result = yield* next(value + 1);
  console.log(4);
  return result + 1;
});
app.addMiddleware(function* (next, value) {
  yield 'c';
  console.log(3);
  return value + 1;
});

const result = app.run(1); // 6
debugger;