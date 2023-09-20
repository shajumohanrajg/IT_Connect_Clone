// store.js

import { createStore } from 'redux';

// Initial state of the store
const initialState = {
    token: null
};

// Reducer to handle actions
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return { ...state, token: action.payload };
        case 'LOGOUT':
            return { ...state, token: null };
        default:
            return state;
    }
};

// Create the Redux store
const store = createStore(reducer);

export default store;
