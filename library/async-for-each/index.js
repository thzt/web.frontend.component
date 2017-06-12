function asyncForEach(opt) {
    var collection = this,
        callback = opt.callback,
        done = opt.done,

        index = 0,
        next = function () {
            if (index == collection.length) {
                done();
                return;
            }
            callback.call(collection[index++], next);
        };

    next();
}

const asyncForEach2 = (values, callback, success) => {
    if (values.length === 0) {
        success();
        return;
    }

    const value = values.shift();
    callback(value, () => asyncForEach2(values, callback, success));
};

export { asyncForEach, asyncForEach2 };