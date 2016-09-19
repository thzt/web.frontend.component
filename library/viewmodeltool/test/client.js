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