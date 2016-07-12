export default function listComprehension(fn) {
    let array = this;
    return recursiveCore.call(array, fn);
}

function recursiveCore(fn) {
    let array = this,
        head = array.shift();

    if (array.length === 0) {
        return [].map.call(
            head,
            (item) => [item]
        );
    }

    let result = recursiveCore.call(array, fn);
    return flatMap.call(
        head,
        (item) => flatMap.call(
            result,
            (items) => [fn(item, items)]
        )
    )
}

function flatMap(fn) {
    let array = this;
    return [].concat.apply([], [].map.call(array, fn));
}