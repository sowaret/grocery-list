module.exports = {
	formatCurrentDate: () => {
		const date = new Date();
		return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
	},

	generateRandomCode: (length, isPassCode) => {
		let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		if (isPassCode) chars = chars + chars.toLowerCase() + '1234567890';
		const count = chars.length;
		let res = '';

		for (let i = 0; i < length; i++) {
			res += chars.charAt(Math.floor(Math.random() * count));
		}

		return res;
	},

	// WebSocket send
	send: (client, data) => client.send(JSON.stringify(data)),

	unixTimestamp: () => Math.floor(Date.now() / 1000),
};
