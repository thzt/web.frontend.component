import setUtil from './index';

let r1 = setUtil.isIntersecting([1, 2], [2, 3, 4]);
console.assert(r1);

let r2 = setUtil.isSubset([1, 2], [1, 2, 3]);
console.assert(r2);

let r3 = setUtil.isEqual([1, 2], [1, 2]);
console.assert(r3);