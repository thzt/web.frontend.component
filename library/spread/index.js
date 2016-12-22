const spread = (...arrays) => {
    let lengths = arrays.map(array => array.length),
        maxLength = Math.max(...lengths);

    return arrays.map(array =>
        [...Array(maxLength).keys()].map(index =>
            array[Math.floor(index * array.length / maxLength)]));
};

export default spread;