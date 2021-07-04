import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		_id: 'unset',
		error: [],
		username: null,
	},
	reducers: {
		setUser: (state, action) => ({
			...state,
			...action.payload,
		}),
		setUserError: (state, action) => {
			// Ensure error is in an array
			state.error = (action.payload && [action.payload]) || [];
		},
	},
});

export const { setUser, setUserError } = userSlice.actions;
export default userSlice.reducer;
