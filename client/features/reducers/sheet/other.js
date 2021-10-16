import { STORE_DEFAULT, ensureArray } from '../../utils/sheet';

export default {
	setDetailsError: (state, action) => {
		state.detailsError = ensureArray(action.payload);
	},
	setJoinError: (state, action) => {
		state.joinError = ensureArray(action.payload);
	},
	setSheet: (state, action) => {
		// e.g. WS POPULATE_SHEET
		const { code, lists, password, sheetId, store, storeProducts, users } =
			action.payload;
		return {
			...state,
			code,
			id: sheetId,
			lists: lists || {},
			...(password && { password }),
			store: store || STORE_DEFAULT,
			storeProducts,
			users,
		};
	},
	setSheetId: (state, action) => {
		state.id = action.payload;
	},
	setStore: (state, action) => {
		state.store = action.payload || STORE_DEFAULT;
	},
};
