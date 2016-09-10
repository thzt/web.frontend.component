((global) => {
    const deepMerge = (target, source) => {
        if (target == null || source == null) {
            return mergeValue(target, source);
        }

        if (isArray(target) && isArray(source)) {
            return mergeArray(target, source);
        }

        if (isObject(target) || isObject(source)) {
            return mergeObject(target, source);
        }

        return mergeValue(target, source);
    };

    const isString = x => Object.prototype.toString.call(x) === '[object String]';
    const isArray = x => Object.prototype.toString.call(x) === '[object Array]';
    const isObject = x => Object.prototype.toString.call(x) === '[object Object]';

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

    const mergeValue = (target, source) => source == null ? target : source;

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

    global.deepMerge = deepMerge;
})(this);