import reduce from './reduce';

// use `reduce` to implement the map function
const map = (array, gen) => reduce(array, function* (memo, val) {
    const result = yield* gen(val);

    memo.push(result);
    return memo;
}, []);

export default map;
