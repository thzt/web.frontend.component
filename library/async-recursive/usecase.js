import asyncRecursive from './index';

// 1. use it directly
asyncRecursive(1, (x, next) => {
    if (x > 9) {
        return;
    }

    setTimeout(() => {
        console.log(x);
        next(x + 1);
    }, 500);
});

// 2. use it to create asyncForEach function
const asyncForEach = function ({ callback, done }) {
    const array = this;

    return asyncRecursive(0, (index, next) => {
        if (index === array.length) {
            done();
            return;
        }

        callback.call(array[index], () => next(index + 1));
    });
};

asyncForEach.call([1, 2, 3], {
    callback(next) {
        let item = this;
        console.log(+item);

        setTimeout(() => {
            next();
        }, 1000);
    },
    done() {
        console.log('done');
    }
});

// 3. use it to create asyncForEach2 function
const asyncForEach2 = (array, callback, done) => asyncRecursive(0, (index, next) => {
    if (index === array.length) {
        done();
        return;
    }

    callback(array[index], () => next(index + 1));
});

asyncForEach2(
    [1, 2, 3],
    (value, next) => {
        console.log(value);

        setTimeout(() => {
            next();
        }, 1000);
    }, () => {
        console.log('done');
    });