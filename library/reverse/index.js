// http://lisperator.net/blog/a-little-javascript-problem/

const range = (min, max) => cont => {
    for (let i = min; i <= max; i++) {
        cont(i);
    }
};
const map = (r, fn) => cont => r(i => cont(fn(i)));
const reverse = r => cont => {
    let f = () => 0;
    r(i => (g => f = () => g(cont(i)))(f));
    f();
};
const foreach = (r, cont) => r(cont);

let numbers = range(1, 10);
numbers = map(numbers, function (n) { return n * n });
numbers = reverse(numbers);
foreach(numbers, console.log);

/* output:

   100
   81
   64
   49
   36
   25
   16
   9
   4
   1
*/

// const reverse = r => cont => {
//     let f = () => 0;
//     r(i => f = (f => () => {
//         cont(i);
//         f();
//     })(f));
//     f();
// };