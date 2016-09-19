const createPath = (path, prop) => {
    if (/^\d+$/.test(prop)) {
        return `${path}[${prop}]`;
    }

    if (path === '') {
        if (prop === '*') {
            return '*';
        }

        if (prop === '**') {
            return '[*]'
        }

        return prop;
    }

    if (prop === '*') {
        return `${path}.*`;
    }

    if (prop === '**') {
        return `${path}[*]`;
    }

    return `${path}.${prop}`;
};

export default createPath;