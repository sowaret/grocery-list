import {
	disconnectUser,
	joinUser,
	reorderStoreProducts,
	setSheet,
} from '../../features/sheetSlice';

const actions = {
	CREATE_SHEET: {},
	CHANGE_SHEET_PASSWORD: {
		parameters: ['confirmPassword', 'newPassword', 'oldPassword'],
		reducer: ({ dispatch, payload }) => {},
		reducerName: 'CHANGED_SHEET_PASSWORD',
	},
	JOIN_SHEET: {
		parameters: ['password', 'sheetCode'],
	},
	REORDER_STORE_PRODUCTS: {
		parameters: ['newIndex', 'oldIndex', 'storeProductId'],
		reducer: ({ dispatch, payload }) => {
			const { oldIndex, newIndex } = payload;
			dispatch(reorderStoreProducts({ oldIndex, newIndex }));
		},
		reducerName: 'REORDERED_STORE_PRODUCTS',
	},
};

const otherReducers = {
	POPULATE_SHEET: ({ dispatch, payload }) => dispatch(setSheet(payload)),
	USER_JOINED: ({ dispatch, payload }) => dispatch(joinUser(payload.user)),
	USER_LEFT: ({ dispatch, payload }) => dispatch(disconnectUser(payload)),
};

module.exports = { sheetActions: actions, otherSheetReducers: otherReducers };
