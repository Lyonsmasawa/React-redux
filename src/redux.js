const reduxLogger = require('redux-logger')
const redux = require('redux')
const createStore = redux.createStore
const combineReducers = redux.combineReducers
const logger = reduxLogger.createLogger()
const applyMiddleware = redux.applyMiddleware


const BUY_CAKE = 'BUY_CAKE'
const BUY_ICE = 'BUY_ICE'

function buyCake() {
    return {
        type: BUY_CAKE,
        inf: 'First reducer action'
    }
}

function buyIce() {
    return {
        type: BUY_ICE,
        inf: 'First reducer action'
    }
}

// const initialState = {
//     numOfCake: 10,
//     numOfIceCream: 20
// }

const initialCakeState = {
    numOfCake: 10
}

const initialIceState = {
    numOfIceCream: 20
}

// const reducer = (state = initialState, action) => {
//     switch (action.type) {
//         case BUY_CAKE:
//             return {
//                 ...state,
//                 numOfCake: state.numOfCake - 1
//             }

//         case BUY_ICE:
//             return {
//                 ...state,
//                 numOfIceCream: state.numOfIceCream - 1
//             }

//         default:
//             return state;
//     }
// }

const iceReducer = (state = initialIceState, action) => {
    switch (action.type) {

        case BUY_ICE:
            return {
                ...state,
                numOfIceCream: state.numOfIceCream - 1
            }

        default:
            return state;
    }
}

const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case BUY_CAKE:
            return {
                ...state,
                numOfCake: state.numOfCake - 1
            }

        default:
            return state;
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    ice: iceReducer
})

// const store = createStore(reducer)
const store = createStore(rootReducer, applyMiddleware(logger))
console.log('InitialState', store.getState())
// const unsubscribe = store.subscribe(() => console.log('Update state', store.getState()))
const unsubscribe = store.subscribe(() => { })
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIce())
store.dispatch(buyIce())
unsubscribe()
store.dispatch(buyCake())
// console.log('InitialState', store.getState())
