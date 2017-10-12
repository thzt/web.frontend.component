# yield-reduce

Because we can't use `yield` in an arrow function.

```
function* () {
    const r = [1, 2, 3].reduce((memo, val) => {
        const x = yield* id(val);
        // Uncaught ReferenceError: yield is not defined

        memo += x;
        return memo;
    }, 0);

    return r;
}
```

so I create a high-order function called `reduce` to do that. (like the `[].reduce`

```
function* () {

    // yield* reduce
    const r = yield* reduce([1, 2, 3], function* (memo, val) {
        // yield another generator
        const x = yield* id(val);

        memo += x;
        return memo;
    }, 0);

    // it must be 6
    return r;
}
```
