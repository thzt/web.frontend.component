import jsonPathFinder from '../src/json-path-finder';

const data1 = {
    list: [
        {
            x: 2
        },
        {
            a: [
                [], []
            ]
        },
        {
            a: [
                [], { b: 1 }
            ]
        },
        {
            a: [
                [], { x: 2, y: 3 }
            ]
        }
    ]
};
console.warn(JSON.stringify(jsonPathFinder.find.call(data1, 'list[*].a[1].*'), null, 4));

const data2 = [1, 2];
data2.test = 3;
console.info(JSON.stringify(jsonPathFinder.find.call(data2, '[*]'), null, 4));
console.info(JSON.stringify(jsonPathFinder.find.call(data2, '.*'), null, 4));

const data3 = { a: 1, b: 2 };
console.log(JSON.stringify(jsonPathFinder.find.call(data3, '[*]'), null, 4));
console.log(JSON.stringify(jsonPathFinder.find.call(data3, '.*'), null, 4));