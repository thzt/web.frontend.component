function add(...args) {
    return this.map(x => x).concat(args);
}

function remove(predicate) {
    return this.filter(x => !predicate(x));
}

function modify(transform) {
    return this.map(x => x).map(x => transform(x));
}

function contain(predicate) {
    return this.some(x => predicate(x));
}

const immutableArray = {
    add,
    remove,
    modify,
    contain
};

export default immutableArray;