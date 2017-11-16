import reduce from './reduce';

const forEach = function (array, gen) {
    return reduce.call(this, array, function* (memo, val, index) {
        yield* gen.call(this, val, index);
    }, null);
};

export default forEach;