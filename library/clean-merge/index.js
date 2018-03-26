(() => {
    const cleanMerge = (target, source) => {
        if (isType(target, 'Array') && isType(source, 'Array')) {
            return mergeArray(target, source);
        }

        if (isType(target, 'Object') && isType(source, 'Object')) {
            return mergeObject(target, source);
        }

        return copy(source);
    };

    const isType = (x, type) => Object.prototype.toString.call(x) === `[object ${type}]`;

    const mergeArray = (target, source) => Array.from(Array(Math.max(target.length, source.length)))
        .reduce((memo, val, i) => {
            const mergedElement = cleanMerge(target[i], copy(source[i]));
            memo.push(mergedElement);

            return memo;
        }, []);

    const mergeObject = (target, source) => Object.keys(source)
        .reduce((memo, key) => {
            const mergedElement = cleanMerge(memo[key], copy(source[key]));
            memo[key] = mergedElement;

            return memo;
        }, copy(target));

    const copy = source => {
        if (isType(source, 'Array')) {
            return source.reduce((memo, val) => {
                memo.push(copy(val));
                return memo;
            }, []);
        }

        if (isType(source, 'Object')) {
            return Object.keys(source).reduce((memo, key) => {
                memo[key] = copy(source[key]);
                return memo;
            }, {});
        }

        return source;
    };

    window.cleanMerge = cleanMerge;
})();

