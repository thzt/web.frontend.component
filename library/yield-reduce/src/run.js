// run a generator
const run = function (gen, val) {
    const iter = gen.call(this, val);

    let current;
    while (true) {
        const { value, done } = iter.next(current);
        current = value;
        if (done) {
            break;
        }
    }

    return current;
};

export default run;