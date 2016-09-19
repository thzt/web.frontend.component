import zip from '../src/zip';

let array1 = [1, 2, 3];
let array2 = ['+', '-', '*', '/'];
let array3 = [4, 5];

let result = zip(array1, array2, array3);
console.log(JSON.stringify(result));