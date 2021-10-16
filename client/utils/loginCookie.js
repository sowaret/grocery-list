module.exports = {
	getLoginCookie: () => {
		const storedCookie = localStorage.getItem('login-cookie');
		if (!storedCookie) return {};
		const [_id, cookie] = storedCookie.split('|');
		return { _id, cookie };
	},
	resetLoginCookie: () => localStorage.removeItem('login-cookie', null),
	setLoginCookie: ({ _id, cookie }) => {
		localStorage.setItem('login-cookie', [_id, cookie].join('|'));
	},
};
