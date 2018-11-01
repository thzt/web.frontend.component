module.exports = {
  // fn的规范： 最后一个参数是callback
  // callback规范： 第一个参数为err，其余参数为返回值
  // 1. 不出错：正常返回
  // 2. 出错，提供了error：回调error，不回调callback
  // 3. 出错，未提供error：静默失败，callback(null,undefined)
  cps: (fn, error) => (...args) => {

    // 按约定args最后一个参数是callback
    const callback = args.pop();

    fn(...args, (err, ...results) => {
      if (!err) {
        callback(null, ...results);
        return;
      }

      // 如果未提供error回调，则静默失败
      if (!error) {
        callback(null);
        return;
      }

      error(err);
      // 出错之后不回调callback
    });
  },

  // 1. 不出错：正常返回
  // 2. 出错，提供了error：回调error，返回undefined
  // 3. 出错，未提供error：静默失败，返回undefined
  sync: (fn, error) => (...args) => {
    try {
      return fn(...args);
    } catch (err) {

      // 为了非侵入性，如果用户未传入error回调，则静默失败
      if (!error) {
        return;
      }

      error(err);
    }
  },
};
