import { default as set } from '../set-util/index';
import { default as util } from '../immutable-array-util/index';
import deepCopy from '../deep-copy/index';

const {isIntersecting, isEqual} = set;

class Relation {
    constructor(relations = []) {
        this._relations = relations;
    }

    add(...args) {
        return new Relation(
            util.add.call(this._relations, ...args)
        );
    }

    remove({elements: removeElements}, isFullMatch) {
        let matchStrategy = createMatchStrategy(isFullMatch);

        return new Relation(
            util.remove.call(this._relations,
                ({ elements }) => matchStrategy(elements, removeElements))
        );
    }

    modify({elements: findElements, transform}, isFullMatch) {
        let matchStrategy = createMatchStrategy(isFullMatch);

        return new Relation(
            util.modify.call(this._relations, item => {
                if (!matchStrategy(item.elements, findElements)) {
                    return item;
                }

                return transform({
                    elements: deepCopy(item.elements),
                    value: item.value
                });
            })
        );
    }

    find({elements: findElements}, isFullMatch) {
        let matchStrategy = createMatchStrategy(isFullMatch);

        return new Relation(
            this._relations.filter(({elements}) => matchStrategy(elements, findElements))
        );
    }

    findNot({elements: findElements}, isFullMatch) {
        let matchStrategy = createMatchStrategy(isFullMatch);

        return new Relation(
            this._relations.filter(
                ({elements}) => !matchStrategy(elements, findElements))
        );
    }

    toList() {
        return this._relations.map(x => x);
    }
}

const createMatchStrategy = isFullMatch => isFullMatch ? isEqual : isIntersecting;

export default Relation;
