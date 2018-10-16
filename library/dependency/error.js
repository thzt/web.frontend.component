class RelationExistError extends Error {
    constructor(parentKey, childKey) {
        super(`已存在父子依赖关系\nparent: ${parentKey}\nchild: ${childKey}`);
    }
}

class ParentCannotFoundError extends Error {
    constructor(childKey) {
        if (childKey == null) {
            super(`没有相应的父级节点`);
            return;
        }

        super(`没有相应的父级节点\nchild: ${childKey}`);
    }
}

class RelationCannotFoundError extends Error {
    constructor(parentKey, childKey) {
        super(`没有相应的父子依赖关系\nparent: ${parentKey}\nchild: ${childKey}`);
    }
}

module.exports = {
    RelationExistError,
    ParentCannotFoundError,
    RelationCannotFoundError,
};