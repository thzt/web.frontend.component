import isArray from '../util/isarray';
import convertBracketToDot from '../util/convertbrackettodot';

// path: list[*].a[1][*]
const find = function (path) {
    let data = this,
        dotPath = convertBracketToDot(path),
        propList = dotPath.split('.'),

        current = [{
            path: '',
            value: data,
            found: true
        }];

    propList.forEach(prop => {
        if (prop === '*' || prop === '**') {
            current = handleWildcard(current, prop);
            return;
        }

        current = handleProp(current, prop);
    });

    return current;
};

const handleWildcard = (current, prop) => {
    let result = [];

    current.forEach(item => {
        if (item.value == null) {
            result.push({
                path: createPath(item.path, prop),
                found: false
            });
            return;
        }

        if (prop === '*') {
            let keys = Object.keys(item.value);
            if (keys.length === 0) {
                result.push({
                    path: createPath(item.path, prop),
                    found: false
                });
                return;
            }

            result = result.concat(keys.map(key => ({
                path: createPath(item.path, key),
                value: item.value[key],
                found: true
            })));
            return;
        }

        if (item.value.length === 0) {
            result.push({
                path: createPath(item.path, prop),
                found: false
            });
            return;
        }

        result = result.concat(item.value.map((ele, index) => ({
            path: createPath(item.path, index),
            value: ele,
            found: true
        })));
    });

    return result;
};

const handleProp = (current, prop) => {
    let result = [];

    current.forEach(item => {
        let path = createPath(item.path, prop);

        if (item.value == null || !item.value.hasOwnProperty(prop)) {
            result.push({
                path,
                found: false
            });
            return;
        }

        result.push({
            path,
            value: item.value[prop],
            found: true
        });
    });

    return result;
};

const createPath = (path, prop) => {
    if (/^\d+$/.test(prop)) {
        return `${path}[${prop}]`;
    }

    if (path === '') {
        if (prop === '*') {
            return '*';
        }

        if (prop === '**') {
            return '[*]'
        }

        return prop;
    }

    if (prop === '*') {
        return `${path}.*`;
    }

    if (prop === '**') {
        return `${path}[*]`;
    }

    return `${path}.${prop}`;
};

export default find;