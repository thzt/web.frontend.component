import {State, runState, bindState, returnState} from './statemonad';

// create a stateMonad
const get = State(state => ({ state: state, value: state }));

// put the value to the state, leave the value with null
const put = value => State(state => ({ state: value, value: null }));

// put the transformed value to the state, leave the value with null
const modify = f => bindState(
    get,
    value => put(f(value))
);

// transform the value, leave the state unchanged
const gets = f => bindState(
    get,
    value => returnState(f(value))
);

export {get, put, modify, gets};