// type Action = {Type, Value}
// type ActionCreator = Value -> Action
// actionCreator :: ActionCreator
const actionCreator = v => ({
    type: 'ADD1',
    v
})