import { setUser } from '../features/userSlice';
import { getLoginCookie } from '../utils/loginCookie';
import {
	actionEnumList,
	responseReducers,
	wsConnected,
	wsDisconnected,
	wsReconnectUser,
} from '../webSocketModule';

const socketMiddleware = _ => {
	let socket = null;
	const onOpen = store => event => {
		store.dispatch(wsConnected(event.target.url));
		const cookie = getLoginCookie();
		if (cookie._id) return store.dispatch(wsReconnectUser(cookie));
		store.dispatch(setUser({ _id: null }));
	};

	const onClose = store => _ => store.dispatch(wsDisconnected());

	const onMessage = store => event => {
		if (event.data === 'ping') return socket.send('pong');

		const dispatch = store.dispatch;
		const { type, ...payload } = JSON.parse(event.data);
		if (type in responseReducers)
			responseReducers[type]({ dispatch, payload });
	};

	// Return middleware
	// Sent to server
	return store => next => action => {
		const { type } = action;
		if (type === 'CONNECT') {
			if (socket !== null) socket.close();
			// Connect to the remote host
			socket = new WebSocket(action.host);
			console.log('creating ws connection');

			socket.onmessage = onMessage(store);
			socket.onclose = onClose(store);
			socket.onopen = onOpen(store);
		}
		else if (type === 'DISCONNECT') {
			if (socket !== null) socket.close();
			socket = null;
			console.log('websocket closed');
		}
		else if (actionEnumList.includes(action.type))
			return socket.send(JSON.stringify(action));

		next(action);
	};
};

export default socketMiddleware();
