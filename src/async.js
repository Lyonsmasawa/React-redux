const redux = require('redux')
const applyMiddleware = redux.applyMiddleware
const createStore = redux.createStore
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')

const initialState = {
    loading: false,
    user: [],
    error: ''
}

const FETCH_USERS_REQUESTS = 'FETCH_USERS_REQUESTS'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

const fetchUserRequests = () => {
    return {
        type: FETCH_USERS_REQUESTS
    }
}

const fetchUserSuccess = users => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUserFailure = error => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                users: action.payload
            }

        case FETCH_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case FETCH_USERS_REQUESTS:
            return {
                ...state,
                loading: true
            }

        default:
            return state
    }
}

const fetchUsers = () => {
    return function (dispatch) {
        dispatch(fetchUserRequests())
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                const users = response.data.map(user => user.id)
                dispatch(fetchUserSuccess(users))
            })
            .catch(error => {
                dispatch(fetchUserFailure(error))
            })
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))
store.subscribe(() => { console.log(store.getState()) })
store.dispatch(fetchUsers())