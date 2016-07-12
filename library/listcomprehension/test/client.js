import 'babel-polyfill';
import listComprehension from '../src/listcomprehension';

let xs1 = [1, 2],
    xs2 = ['+', '-'],
    xs3 = [8, 9],
    params = [xs1, xs2, xs3];

console.log(JSON.stringify(params));

console.log(JSON.stringify(
    listComprehension.call(
        params,
        (item, items) => [item, ...items])
));