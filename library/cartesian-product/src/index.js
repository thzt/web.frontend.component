const concat = array => [].concat.apply([], array);
const map = (fn, array) => [].map.call(array, fn);
const flatMap = (fn, array) => concat(map(fn, array));

const cartesianProduct = sets => {
    let head = sets.shift();
    if (sets.length === 0) {
        return map(
            item => [item],
            head
        );
    }

    let tailProduct = cartesianProduct(sets);
    return flatMap(
        item => flatMap(
            items => [[item, ...items]],
            tailProduct
        ),
        head
    );
};

export default cartesianProduct;