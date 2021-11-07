import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import app from './features/appSlice';
import sheet from './features/sheetSlice';
import user from './features/userSlice';
import wsMiddleware from './websocket/middleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
	combineReducers({ app, sheet, user }),
	composeEnhancers(applyMiddleware(wsMiddleware))
);
