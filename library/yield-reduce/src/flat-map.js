import reduce from './reduce';

const flatMap = function (array, gen) {
    return reduce.call(this, array, function* (memo, val, index) {
        const results = yield* gen.call(this, val, index);
        return memo.concat(results);
    }, []);
};

export default flatMap;