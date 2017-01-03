const objectAssign = (target, ...sources) => {
    sources.forEach(source =>
        Object.keys(source).forEach(propName =>
            target[propName] = source[propName]));

    return target;
};

export default objectAssign;