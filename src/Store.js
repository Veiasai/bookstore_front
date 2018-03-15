import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'

const reducer = combineReducers(
    {

    }
);


export default createStore(
    reducer
    );