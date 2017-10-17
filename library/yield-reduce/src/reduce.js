// use case 
// yield* reduce(arr, function*(memo,val,index){ }, init)
const reduce = function* (array, gen, init) {
    let memo = init;
    for (let i = 0; i < array.length; i++) {
        const val = array[i];
        memo = yield* gen.call(this, memo, val, i);
    }

    return memo;
};

export default reduce;