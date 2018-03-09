import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'

const reducer = combineReducers(
    {
        messages: Sendreducer,
    }
);


export default createStore(
    reducer,
    applyMiddleware(createSagaMiddleware())
    );