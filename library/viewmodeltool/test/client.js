import {focus, collect, find} from '../src/viewmodeltool';

const users = [{
    name: 'Jhon',
    parents: ['Tom', 'Jerry']
}];

let value = focus.call(users, '[0].parents[1]');
console.log(value);

// ----

let collected = collect([
    {
        prop: '[0].name',
        value: 'Jhon'
    },
    {
        prop: '[0].parents[0]',
        value: 'Tom'
    },
    {
        prop: '[0].parents[1]',
        value: 'Jerry'
    }
]);

console.log(JSON.stringify(collected, null, 4));

// ----

const data = {
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

let result = find.call(data, 'list[*].a[1].*');

console.log(JSON.stringify(result, null, 4));