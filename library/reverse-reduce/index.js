// memo1: x => x
// memo2: x => memo1(fn(x, val1)) === x => fn(x, val1)
// memo3: x => memo2(fn(x, val2)) === x => fn(fn(x, val2), val1)
// memo4: x => memo3(fn(x, val3)) === x => fn(fn(fn(x, val3), val2), val1)
const reduceRight = (items, fn, init) => items.reduce(
    (memo, val) => x => memo(fn(x, val)),
    x => x
)(init);

const reduceLeft = (items, fn, init) => reduceRight(
    items,
    (memo, val) => x => memo(fn(x, val)),
    x => x,
)(init);

const items = [1, 2, 3];

const r1 = items.reduce((memo, val) => memo + val, '');
console.log(r1);  // 123

const r2 = reduceRight(items, (memo, val) => memo + val, '');
console.log(r2);  // 321

const r3 = reduceLeft(items, (memo, val) => memo + val, '');
console.log(r3);  // 123