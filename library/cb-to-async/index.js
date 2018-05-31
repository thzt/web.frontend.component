const asyncToCb = asyncFn => (...args) => {
    const cb = args.pop();
    asyncFn(...args).then(cb);
};

const cbToAsync = cbFn => async (...args) => await new Promise((res, rej) => cbFn(...args, res));

// - - -

// use case 

const cbFn = asyncToCb(async (...args) => {
    return 3;
});

cbFn(1, 2, v => {
    console.log(v);  // 3
});

const asyncFn = cbToAsync((a, b, cb) => {
    cb(3);
});

asyncFn(1, 2).then(v => {
    console.log(v);  // 3
});