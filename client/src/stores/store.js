import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import homesReducer from '../reducers/homesReducer';
import authReducer from '../reducers/authReducer';

const store = createStore(combineReducers({homes: homesReducer, auth: authReducer}), applyMiddleware(thunk));

export default store;
