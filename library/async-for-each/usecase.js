import asyncForEach from './index';

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