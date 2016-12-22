// bindActionCreator :: (ActionCreator, Dispatch) -> State -> ()
const bindActionCreator = (actionCreator, dispatch) => initialState => dispatch(actionCreator(initialState))
