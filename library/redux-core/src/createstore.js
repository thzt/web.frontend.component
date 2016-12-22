// type Listener = (State, Action) -> ()
// type GetState = () -> State
// type Subscribe = Listener -> ()
// type Dispatch = Action -> ()
// type Store = {GetState, Subscribe, Dispatch}
// type CreateStore = (Reducer, State) -> Store
// createStore :: CreateStore
const createStore = (reducer, initialState) => {
    let state = initialState,
        listenerList = []

    return {
        getState: () => state,
        subscribe: listener => {
            listenerList.push(listener)
        },
        dispatch: action => {
            listenerList.forEach(listener => listener(state, action))
            state = reducer(state, action)
        }
    }
}