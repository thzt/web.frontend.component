import { asyncForEach, asyncForEach2 } from './index';

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