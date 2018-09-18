const runPromise = async (lazyPromises, n) => {
    const length = lazyPromises.length;
    const count = Math.ceil(length / n);

    let results = [];
    for (let i = 0; i <= count; i++) {
        const rs = await Promise.all(lazyPromises.slice(n * i, n * (i + 1)).map(lazyPromise => lazyPromise()));
        results = results.concat(rs);
    }

    return results;
};

runPromise(
    [
        () => new Promise(res => setTimeout(res, Math.random() * 1000, 1)),
        () => new Promise(res => setTimeout(res, Math.random() * 1000, 2)),
        () => new Promise(res => setTimeout(res, Math.random() * 1000, 3)),
        () => new Promise(res => setTimeout(res, Math.random() * 1000, 4)),
        () => new Promise(res => setTimeout(res, Math.random() * 1000, 5)),
        () => new Promise(res => setTimeout(res, Math.random() * 1000, 6)),
        () => new Promise(res => setTimeout(res, Math.random() * 1000, 7)),
        () => new Promise(res => setTimeout(res, Math.random() * 1000, 8)),
        () => new Promise(res => setTimeout(res, Math.random() * 1000, 9)),
    ],
    4,
).then(console.log);