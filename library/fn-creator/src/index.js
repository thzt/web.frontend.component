const fnCreator = ({params, body, identifiers = [], values = []}) => function () {
    let fn = Function.apply(null, [...params, ...identifiers, body]);
    return fn.apply(this, [...arguments, ...values]);
};

export default fnCreator;