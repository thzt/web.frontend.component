import deepMerge from '../src/deepmerge';

const target = [
    { a: 1, b: 2 },
    [
        '333',
        { c: 4, d: 5 },
        [6]
    ]
];

const source = {
    0: { a: 7, b: null },
    1: [
        [8, 9],
        null,
        10,
        [11]
    ]
};

const result = deepMerge(target, source);
console.warn(JSON.stringify(result, null, 4));