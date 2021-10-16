import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import app from './features/appSlice';
import { default as sheet } from './features/sheetSlice';
import user from './features/userSlice';
import wsMiddleware from './websocket/middleware';

export default createStore(
	combineReducers({ app, sheet, user }),
	compose(
		applyMiddleware(wsMiddleware),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);
