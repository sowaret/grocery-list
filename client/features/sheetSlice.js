import { createSlice } from '@reduxjs/toolkit';
import sheetReducers from './reducers/sheet';
import { STORE_DEFAULT } from './utils/sheet';

export const sheetSlice = createSlice({
	name: 'sheet',
	initialState: {
		checklistListId: null,
		claimColumnListId: null,
		code: null,
		detailsError: [],
		id: null,
		joinError: [],
		isSorting: false,
		lists: {},
		newItemListId: null,
		password: null,
		showClaimColumn: false,
		store: STORE_DEFAULT,
		storeProducts: {},
		users: {},
	},
	reducers: sheetReducers,
});

module.exports = Object.assign(sheetSlice.reducer, sheetSlice.actions);
