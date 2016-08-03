(function (global) {
    global.createStreamOperator = handler => (fn, ...streams) => cont => streams.forEach(stream => stream(val => handler(val, fn, cont)));
} (window));