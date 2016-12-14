/*
    (target,source):(null,_)|(_,null) = _

    (target,source):(string,string) = source
    (target,source):(string,array) = source
    (target,source):(string,object) = source

    (target,source):(array,string) = target
    (target,source):(array,array) = mergeArray
    (target,source):(array,object) = mergeObject

    (target,source):(object,string) = target
    (target,source):(object,array) = mergeObject
    (target,source):(object,object) = mergeObject
*/

const deepMerge = (target, source) => {
    if (target == null || source == null) {
        return mergeNull(target, source);
    }

    if (isType(target, 'String')) {
        return source;
    }

    if (isType(source, 'String')) {
        return target;
    }

    if (isType(target, 'Array') && isType(source, 'Array')) {
        return mergeArray(target, source);
    }

    return mergeObject(target, source);
};

const isType = (x, type) => Object.prototype.toString.call(x) === `[object ${type}]`;

const mergeArray = (target, source) => {
    let result = [],
        length = Math.max(target.length, source.length);

    for (let i = 0; i < length; i++) {
        let mergedElement = deepMerge(target[i], source[i]);
        result[i] = mergedElement;
    }

    return result;
};

const mergeObject = (target, source) => {
    let result = {},
        unionKeys = union(Object.keys(target), Object.keys(source));

    unionKeys.forEach(key => {
        let mergedElement = deepMerge(target[key], source[key]);
        result[key] = mergedElement;
    });

    return result;
};

const mergeNull = (target, source) => source == null ? target : source;

const union = (array1, array2) => {
    let hashtable = {};
    array1.forEach(ele => hashtable[ele] = true);
    array2.forEach(ele => {
        if (hashtable[ele]) {
            return;
        }

        hashtable[ele] = true;
    });

    return Object.keys(hashtable);
}

export default deepMerge;