import { default as util } from './index';

let arr = [1, 2, 3];
let r1 = util.add.call(arr, 4);
console.log(arr);
console.warn(r1);

let r2 = util.remove.call(arr, x => x % 2 == 0);
console.log(arr);
console.warn(r2);

let r3 = util.modify.call(arr, x => x * 2);
console.log(arr);
console.warn(r3);

let r4 = util.contain.call(arr, x => x % 2 == 0);
console.log(arr);
console.warn(r4);