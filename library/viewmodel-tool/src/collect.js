import isInteger from '../util/isinteger';
import convertBracketToDot from '../util/convertbrackettodot';

// propValueMaps: [{prop,value}]
const collect = propValueMaps => {
    if (propValueMaps.length === 0) {
        return null;
    }

    //propValueMaps: [{prop:'[1].a[2].b',value:3}, ...]
    //dotPropValueMaps: [{dotProp:'1.a.2.b',value:3}, ...]
    let dotPropValueMaps = getDotPropValueMaps(propValueMaps);
    return createObject(dotPropValueMaps);
}

const getDotPropValueMaps = propValueMaps => propValueMaps.map(({prop, value}) => ({
    dotProp: convertBracketToDot(prop),
    value
}));

const createObject = dotPropValueMaps => {
    let headMap = dotPropValueMaps[0],
        headProp = headMap.dotProp.split('.')[0],
        collecting = isInteger(headProp) ? [] : {};

    dotPropValueMaps.forEach(({dotProp, value}) => {
        let propList = dotProp.split('.'),
            current = collecting;

        propList.forEach((prop, index) => {
            if (index === propList.length - 1) {
                current[prop] = value;
                return;
            }

            if (current[prop] != null) {
                current = current[prop];
                return;
            }

            if (isInteger(propList[index + 1])) {
                current[prop] = [];
                current = current[prop];
                return;
            }

            current[prop] = {};
            current = current[prop];
        });
    });

    return collecting;
}

export default collect;