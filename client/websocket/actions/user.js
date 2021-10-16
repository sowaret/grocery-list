import { setCurrentPOST } from '../../features/appSlice';
import { setUser } from '../../features/userSlice';
import { resetLoginCookie, setLoginCookie } from '../../utils/loginCookie';

const setLoginReducer = {
	reducer: ({ dispatch, payload }) => {
		const { cookie, user } = payload;
		setLoginCookie({ _id: user._id, cookie });
		dispatch(setUser(user));
		dispatch(setCurrentPOST(null));
	},
};

const actions = {
	LOG_IN_USER: {
		parameters: ['password', 'username'],
		reducerName: 'LOGGED_IN_USER',
		...setLoginReducer,
	},
	RECONNECT_USER: {
		parameters: ['_id', 'cookie'],
		reducer: ({ dispatch, payload }) => dispatch(setUser(payload.user)),
		reducerName: 'RECONNECTED_USER',
	},
	REGISTER_USER: {
		parameters: ['username', 'password', 'confirmPassword'],
		reducerName: 'REGISTERED_USER',
		...setLoginReducer,
	},
};

const otherReducers = {
	INVALIDATE_LOGIN_COOKIE: ({ dispatch, payload }) => {
		console.warn('Invalid login cookie');
		dispatch(setUser({ _id: null }));
		resetLoginCookie();
	},
};

module.exports = { userActions: actions, otherUserReducers: otherReducers };
