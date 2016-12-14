const isType = (x, type) => Object.prototype.toString.call(x) === `[object ${type}]`;

const deepCopy = source => {
    if (isType(source, 'Array')) {
        return deepCopyArray(source);
    }

    if (isType(source, 'Object')) {
        return deepCopyObject(source);
    }

    if (isType(source, 'String')) {
        return source.toString();
    }

    if (isType(source, 'Number')) {
        return +source;
    }

    return null;
};

const deepCopyArray = array => array.reduce((memo, element) => {
    memo.push(deepCopy(element));
    return memo;
}, []);

const deepCopyObject = object => Object.keys(object).reduce((memo, key) => {
    memo[key] = deepCopy(object[key]);
    return memo;
}, {});

export default deepCopy;