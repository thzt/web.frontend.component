const filterOut = function (predicate) {
    let collection = this,
        length = collection.length;

    for (let index = 0; index < length; index++) {
        let element = collection[index];

        if (!predicate.call(collection, element, index)) {
            continue;
        }

        collection.splice(index, 1);
        index--;
        length--;
    }
}

export default filterOut;