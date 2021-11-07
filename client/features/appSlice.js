import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
	name: 'app',
	initialState: {
		currentPOST: null,
		currentView: null,
	},
	reducers: {
		setCurrentPOST: (state, action) => {
			state.currentPOST = action.payload || null;
		},
		setCurrentView: (state, action) => {
			state.currentView = action.payload || null;
		},
	},
});

export const { setCurrentPOST, setCurrentView } = appSlice.actions;
export default appSlice.reducer;
