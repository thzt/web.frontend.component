const chainPromise = ({
    lazyPromises,
    shouldBreak,
}) => recursiveCore(lazyPromises, shouldBreak, []);

const recursiveCore = (lazyPromises, shouldBreak, acc) => {
    return new Promise((res, rej) => {
        if (lazyPromises.length == 0) {
            res(acc);
            return;
        }

        const lazyPromise = lazyPromises.shift();
        lazyPromise().then(v => {
            acc.push(v);
            if (shouldBreak(v)) {
                res(acc);
                return;
            }

            res(recursiveCore(lazyPromises, shouldBreak, acc));
        });
    });
};

export default chainPromise;

// const lazyPromise1 = () => new Promise((res, rej) => setTimeout(() => {
//     res(1);
// }, 0));

// const lazyPromise2 = () => new Promise((res, rej) => setTimeout(() => {
//     res(2);
// }, 0));

// const lazyPromise3 = () => new Promise((res, rej) => setTimeout(() => {
//     res(3);
// }, 0));

// chainPromise({
//     lazyPromises: [lazyPromise1, lazyPromise2, lazyPromise3],
//     shouldBreak: v => {
//         return v == 2;
//     },
// }).then(v => {
//     console.log(JSON.stringify(v));
// });