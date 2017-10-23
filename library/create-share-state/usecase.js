import createShareState from './index';

const state = createShareState(1);

const f1 = state.share(({ setState, getState }) => x1 => {
    console.log('f1 arg:', x1);

    const v = getState();
    console.log('f1 getState:', v);

    setState(2);
    console.log('f1 setState:', 2);
});

const f2 = state.share(({ setState, getState }) => function (x2) {
    console.log('f2 this:', this);
    console.log('f2 arg:', x2);

    const v = getState();
    console.log('f2 getState:', v);

    setState(3);
    console.log('f2 setState:', 3);
});

const f3 = state.share(({ setState, getState }) => function* (x3) {
    console.log('f3 this:', this);
    console.log('f3 arg:', x3);

    const v = getState();
    console.log('f3 getState:', v);

    setState(4);
    console.log('f3 setState:', 4);
});

f1(5);
// f1 arg: 5
// f1 getState: 1
// f1 setState: 2

f2.call(6, 7);
// f2 this: Number {[[PrimitiveValue]]: 6}
// f2 arg: 7
// f2 getState: 2
// f2 setState: 3

f3.call(8, 9).next();
// f3 this: Number {[[PrimitiveValue]]: 8}
// f3 arg: 9
// f3 getState: 3
// f3 setState: 4