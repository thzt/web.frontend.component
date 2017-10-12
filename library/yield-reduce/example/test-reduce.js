import reduce from '../src/reduce';
import run from '../src/run';

// another generator
const id = function* (v) {
    return yield v;
};

// run the example
const reduceResult = run.call(7, function* () {
    console.assert(this === 7);

    // yield* reduce
    const r = yield* reduce.call(5, [1, 2, 3], function* (memo, val) {
        console.assert(this === 5);

        // yield another generator
        const x = yield* id(val);

        memo += x;
        return memo;
    }, 0);

    // it must be 6
    return r;
});

console.warn(`reduce result: ${reduceResult}`);
console.assert(reduceResult === 6);