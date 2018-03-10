// 用于对数组进行分类，返回一个Map
// fn:val->key，遍历数组对象，返回一个用于分类的key
// 最终返回的结果如下，[(key,[val])]
const classify = (array, fn) => array.reduce((memo, val, index) => {
    const key = fn(val, index);

    // 如果key是null或undefined，就忽略该项
    if (key == null) {
        return memo;
    }

    if (memo.has(key)) {
        const valueStore = memo.get(key);
        valueStore.push(val);
        return memo;
    }

    memo.set(key, [val]);
    return memo;
}, new Map);

module.exports = classify;