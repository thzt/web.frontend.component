import createPath from './create-path';

const handleProp = (current, prop) => {
    let result = [];

    current.forEach(item => {
        let path = createPath(item.path, prop);

        if (item.value == null
            || !item.value.hasOwnProperty(prop)
            || item.value[prop] == null
        ) {
            result.push({
                path,
                found: false
            });
            return;
        }

        result.push({
            path,
            value: item.value[prop],
            found: true
        });
    });

    return result;
};

export default handleProp;