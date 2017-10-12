import filter from './reduce';

// use `reduce` to implement the filter function
const filter = function (array, gen) {
    return reduce.call(this, array, function* (memo, val, index) {
        const isPass = yield* gen.call(val, index);
        if (!isPass) {
            return memo;
        }

        memo.push(val);
        return memo;
    }, []);
};

export default filter;