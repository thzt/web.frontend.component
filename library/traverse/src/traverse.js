export default function traverse({walker, callback}) {
    let data = this,
        iter = walker.call(data),
        nextValue;

    while (true) {
        let iterResult = iter.next(nextValue);

        if (iterResult.done) {
            return iterResult.value;
        }

        nextValue = callback(iterResult.value);
    }
};