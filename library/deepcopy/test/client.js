import deepCopy from '../src/deepcopy';

console.log(JSON.stringify(deepCopy(1), null, 4));
console.log(JSON.stringify(deepCopy('2'), null, 4));
console.log(JSON.stringify(deepCopy(new Number(1)), null, 4));
console.log(JSON.stringify(deepCopy(new String('2')), null, 4));
console.log(JSON.stringify(deepCopy([]), null, 4));
console.log(JSON.stringify(deepCopy({}), null, 4));
console.log(JSON.stringify(deepCopy(null), null, 4));
console.log(JSON.stringify(deepCopy(NaN), null, 4));
console.log(JSON.stringify(deepCopy([1, { a() { }, b: () => { }, c: 2, d: [3], e: { f: 4 } }]), null, 4));
console.log(JSON.stringify(deepCopy({ a() { }, b: () => { }, c: 2, d: [3], e: { f: 4 } }), null, 4));