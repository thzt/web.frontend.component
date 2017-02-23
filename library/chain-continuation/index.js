const chainContinuation = (...funcs) => ({params, shouldBreak}, cont) => recursiveCore(funcs, params, shouldBreak, [], cont);

const recursiveCore = (funcs, params, shouldBreak, accumulation, cont) => {
    if (funcs.length == 0) {
        cont(...accumulation);
        return;
    }

    const func = funcs.shift();
    const param = params.shift();

    func(param, (...results) => {
        accumulation.push(results);

        if (shouldBreak(...results)) {
            cont(...accumulation);
            return;
        }

        recursiveCore(funcs, params, shouldBreak, accumulation, cont);
    });
}

// const f1 = (option, cont) => {
//     console.log(option);    //1
//     cont(true, 123);
// }

// const f2 = (option, cont) => {
//     console.log(option);    //2
//     cont(false, 456);
// };

// const f3 = (option, cont) => {
//     console.log(option);
//     cont(true, 789);
// };

// const f = chainContinuation(f1, f2, f3);
// f({
//     params: [1, 2, 3],
//     shouldBreak: (isPass, message) => {
//         return !isPass;
//     }
// }, (...args) => {
//     console.log(JSON.stringify(args));    //[[true,123],[false,456]]
// });