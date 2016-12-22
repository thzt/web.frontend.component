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

export default asyncForEach;