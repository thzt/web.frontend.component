// compose :: [t -> t] -> (t -> t)
const compose = (...fns) => {
    let last = fns.pop()
    return (...args) => fns.reduceRight((memo, fn) => fn(memo), last(...args))
}

// for example: 
// type Next = Dispatch
// type Middleware = {GetState, Dispatch} -> Next -> Dispatch
// middleware :: Middleware
// const middleware = ({ getState, dispatch }) => next => action => next(action)

// applyMiddleware :: [Middleware] -> CreateStore -> CreateStore
const applyMiddleware = (...middlewares) => createStore => (reducer, initialState) => {
    let store = createStore(reducer, initialState),
        dispatch = store.dispatch,

        // chain :: [Next -> Dispatch]
        chain = middlewares.map(middleware => middleware({
            getState: store.getState,
            dispatch: action => dispatch(action)
        }))

    dispatch = compose(...chain)(dispatch)

    return {
        getState: store.getState,
        subscribe: store.subscribe,
        dispatch
    }
}