const zip = (...arrays) => {
    let result = [],
        lengths = arrays.map(array => array.length),
        length = Math.min(...lengths);

    for (let i = 0; i < length; i++) {
        result.push(arrays.map(array => array[i]));
    }

    return result;
};

export default zip;