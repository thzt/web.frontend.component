/*
    1. 内容
    用于对多个数组按数组元素名求并集，也可用于对单个数组中的元素去重。

    2. 关键点
    因为最后Object.keys返回的值是一个字符串数组，所以，参数arrays也应该是一个字符串数组。
    union只能用于对字符串数组求并集。
*/

const union = (...arrays) => {
    const cache = {};
    [].concat.apply([], arrays).forEach(item => {
        if (cache[item]) {
            return;
        }

        cache[item] = true;
    });

    return Object.keys(cache);
};

module.exports = union;