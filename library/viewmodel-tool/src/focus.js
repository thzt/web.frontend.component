import convertBracketToDot from '../util/convertbrackettodot';

// prop: [1].a[2].b
function focus(prop) {
    let obj = this,
        dotProp = convertBracketToDot(prop),
        value = getDotPropValue(obj, dotProp);

    return value;
}

const getDotPropValue = (obj, dotProperty) => dotProperty.split('.').reduce(
    (memo, val) => memo == null ? null : memo[val],
    obj
);

export default focus;