export default function fnCreator({params, body, identifiers = [], values = []}) {
    return function () {
        let fn = Function.apply(null, [...params, ...identifiers, body]);
        return fn.apply(this, [...arguments, ...values]);
    };
}