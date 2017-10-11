// run a generator
const run = (gen, val) => {
    const iter = gen(val);

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