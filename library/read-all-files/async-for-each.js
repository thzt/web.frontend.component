const asyncForEach = (files, callback, success) => {
    if (files.length === 0) {
        success();
        return;
    }

    const file = files.shift();
    callback(file, () => asyncForEach(files, callback, success));
};

module.exports = asyncForEach;