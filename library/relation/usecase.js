let relation = new Relation([
    {
        elements: [1, 2, 3],
        value: () => 1
    },
    {
        elements: [2, 3],
        value: () => 2
    },
    {
        elements: [1, 4],
        value: () => 3
    },
    {
        elements: [2, 4],
        value: () => 4
    }
]);

let r_add = relation.add({
    elements: [3],
    value: () => 5
});

let r_remove_1 = relation.remove({
    elements: [2, 3]
});

let r_remove_2 = relation.remove({
    elements: [2, 3]
}, true);

let r_modify_1 = relation.modify({
    elements: [2, 3],
    transform: ({elements, value}) => {
        elements[0] = 7;

        return {
            elements,
            value: () => 6
        };
    }
});

let r_modify_2 = relation.modify({
    elements: [2, 3],
    transform: ({elements, value}) => {
        elements[0] = 7;

        return {
            elements,
            value
        };
    }
}, true);

let r_find_1 = relation.find({
    elements: [2, 3]
});

let r_find_2 = relation.find({
    elements: [2, 3]
}, true);

console.log(JSON.stringify(relation.toList()));
console.log(JSON.stringify(r_add.toList()));
console.log(JSON.stringify(r_remove_1.toList()));
console.log(JSON.stringify(r_remove_2.toList()));
console.log(JSON.stringify(r_modify_1.toList()));
console.log(JSON.stringify(r_modify_2.toList()));
console.log(JSON.stringify(r_find_1.toList()));
console.log(JSON.stringify(r_find_2.toList()));