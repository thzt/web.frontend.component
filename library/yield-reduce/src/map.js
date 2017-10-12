import reduce from './reduce';

// use `reduce` to implement the map function
const map = function (array, gen) {
    return reduce.call(this, array, function* (memo, val, index) {
        const result = yield* gen.call(this, val, index);

        memo.push(result);
        return memo;
    }, []);
}

export default map;
