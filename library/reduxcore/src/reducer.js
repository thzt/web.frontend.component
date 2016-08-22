// type Reducer = (State, Action) -> State
// reducer :: Reducer
const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD1':
            return state + 1

        default:
            return state
    }
}