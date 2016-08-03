(function (global) {
    global.createStreamOperator = handler => (stream, fn) => cont => stream(val => handler(val, fn, cont));
} (window));