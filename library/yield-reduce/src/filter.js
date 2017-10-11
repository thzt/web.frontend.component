import filter from './reduce';

// use `reduce` to implement the filter function
const filter = (array, gen) => reduce(array, function* (memo, val) {
    const isPass = yield* gen(val);
    if (!isPass) {
        return memo;
    }

    memo.push(val);
    return memo;
}, []);

export default filter;