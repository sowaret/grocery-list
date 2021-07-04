export default {
	disconnectUser: (state, action) => {
		state.users[action.payload.id].isDisconnected = true;
	},
	joinUser: (state, action) => {
		const { customColour, id, username } = action.payload;
		state.users = {
			...state.users,
			[id]: { customColour, username },
		};
	},
};
