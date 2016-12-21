class Relation {
    constructor() {
        let instance = this;
        instance._relations = [];
    }

    add(relation) {
        let instance = this,
            relations = instance._relations;

        relations.push(relation);
        return this;
    }

    find({elements}) {
        let instance = this,
            relations = instance._relations,
            findElements = elements;

        return relations.filter(({elements, value}) => hasIntersection(elements, findElements));
    }

    remove({elements}) {
        let instance = this,
            relations = instance._relations,
            removeElements = elements,
            length = relations.length;

        filterOut.call(relations, ({ elements }) => hasIntersection(elements, removeElements));
        return this;
    }
}

const filterOut = function (fn) {
    let collection = this,
        length = collection.length;

    for (let index = 0; index < length; index++) {
        let element = collection[index];

        if (!fn.call(collection, element, index)) {
            continue;
        }

        collection.splice(index, 1);
        index--;
        length--;
    }
}

const hasIntersection = (smallSet, bigSet) => smallSet.some(x => bigSet.includes(x));