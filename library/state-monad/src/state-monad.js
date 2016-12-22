// type
const State = field => ({
    field//field::state=>{state,value}
});
const runState = stateMonad => stateMonad.field;

// monad
const returnState = value => State(state => ({ state, value }));
const bindState = (stateMonad, valueToStateMonad) => State(oldState => {
    let {state, value} = runState(stateMonad)(oldState);
    return runState(valueToStateMonad(value))(state);
});

// extra
const evalState = stateMonad => state => runState(stateMonad)(state).value;
const execState = stateMonad => state => runState(stateMonad)(state).state;

export {State, runState, returnState, bindState, evalState, execState};