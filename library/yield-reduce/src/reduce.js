// use case 
// yield* reduce(arr, function*(memo,val){ }, init)
const reduce = (array, gen, init) => (function* () {
    let memo = init;
    for (let i = 0; i < array.length; i++) {
        const val = array[i];
        memo = yield* gen(memo, val);
    }

    return memo;
}());

export default reduce;