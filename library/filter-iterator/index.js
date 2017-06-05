(() => {
    const filterIterator = function* (iter, filter) {
        while (true) {
            const { done, value } = iter.next();
            if (done) {
                return;
            }

            if (!filter(value)) {
                continue;
            }

            yield value;
        }
    }

    window.filterIterator = filterIterator;
})();