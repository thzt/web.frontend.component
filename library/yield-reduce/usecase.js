import reduce from './src/reduce';
import run from './src/run';

// another generator
const id = function* (v) {
    return yield v;
};

// run the example
const reduceResult = run(function* () {

    // yield* reduce
    const r = yield* reduce([1, 2, 3], function* (memo, val) {
        // yield another generator
        const x = yield* id(val);

        memo += x;
        return memo;
    }, 0);

    // it must be 6
    return r;
});

console.warn(`reduce result: ${reduceResult}`);
console.assert(reduceResult == 6);