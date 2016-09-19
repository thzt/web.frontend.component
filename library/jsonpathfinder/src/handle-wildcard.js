import createPath from './create-path';
import isArray from '../util/is-array';

const handleWildcard = (current, prop) => {
    let result = [];

    current.forEach(item => {
        if (item.value == null) {
            result.push(getUnfoundResult(item.path, prop));
            return;
        }

        if (isArray(item.value) && prop === '**') {
            result = result.concat(getArrayResult(item.value, item.path, prop));
            return;
        }

        result = result.concat(getObjectResult(item.value, item.path, prop));
    });

    return result;
};

const getUnfoundResult = (path, prop) => ({
    path: createPath(path, prop),
    found: false
});

const getArrayResult = (arr, path, prop) => {
    if (arr.length === 0) {
        return [getUnfoundResult(path, prop)];
    }

    return arr.map((ele, index) => ({
        path: createPath(path, index),
        value: ele,
        found: true
    }));
};

const getObjectResult = (obj, path, prop) => {
    let keys = Object.keys(obj);

    if (keys.length === 0) {
        return [getUnfoundResult(path, prop)];
    }

    return keys.map(key => ({
        path: createPath(path, key),
        value: obj[key],
        found: true
    }));
};

export default handleWildcard;