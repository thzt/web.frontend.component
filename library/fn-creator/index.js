const fnCreator = ({ params, body, identifiers = [], values = [] }) => function () {
    let fn = Function(...params, ...identifiers, body);
    return fn.call(this, ...arguments, ...values);
};

export default fnCreator;