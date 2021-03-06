import 'babel-polyfill';
import traverse from '../src/traverse';
import walker from '../src/walker';

let array = [7, 8, -1, 9],

    isCompleted = traverse.call(array, {
        walker: walker.stopWhenErrorWalker,
        callback: (item) => {
            console.log(item);

            if (item == -1) {
                return false;
            }
        }
    });

console.log(isCompleted);