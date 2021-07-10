import { createSocketMiddleware } from '@sowaret/redux-websocket-middleware';
import { setUser } from '../features/userSlice';
import { getLoginCookie } from '../utils/loginCookie';
import {
	actionEnumList,
	responseReducers,
	wsReconnectUser,
} from '../webSocketModule';

export default createSocketMiddleware({
	actionEnumList,
	responseReducers,
	onSocketOpen: store => {
		const cookie = getLoginCookie();
		if (cookie._id) return store.dispatch(wsReconnectUser(cookie));
		store.dispatch(setUser({ _id: null }));
	},
});
