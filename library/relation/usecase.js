import Relation from './index';

let relation = new Relation;

relation.add({
    elements: [1, 2, 3],
    value: () => { 1 }
});
relation.add({
    elements: [2, 3],
    value: () => { 2 }
});
relation.add({
    elements: [1, 4],
    value: () => { 3 }
});
relation.add({
    elements: [2, 4],
    value: () => { 4 }
});

let results = relation.find({
    elements: [1, 3]
});

relation.remove({
    elements: [1, 3]
});

