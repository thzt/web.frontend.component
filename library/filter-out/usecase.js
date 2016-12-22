import filterOut from './index';

let arr = [1, 2, 3];
filterOut.call(arr, x => x % 2 == 0);

// arr === [1, 3]