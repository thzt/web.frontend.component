import handleProp from './handle-prop';
import handleWildcard from './handle-wildcard';
import convertBracketToDot from './convert-bracket-to-dot';

// path: list[*].a[1][*]
const find = function (path) {
    let data = this,
        dotPath = convertBracketToDot(path),
        propList = dotPath.split('.'),

        current = [{
            path: '',
            value: data,
            found: true
        }];

    propList.forEach(prop => {
        if (prop === '*' || prop === '**') {
            current = handleWildcard(current, prop);
            return;
        }

        current = handleProp(current, prop);
    });

    return current;
};

const jsonPathFinder = {
    find
};

export default jsonPathFinder;