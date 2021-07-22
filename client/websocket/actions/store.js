import { setCurrentView } from '../../features/appSlice';
import { setStore } from '../../features/sheetSlice';

module.exports = {
	CHANGE_STORE: {
		parameters: ['sheetId', 'storeDetails'],
		reducer: ({ dispatch, payload }) => {
			dispatch(setStore(payload.store));
			dispatch(setCurrentView(null));
		},
		reducerName: 'CHANGED_STORE',
	},
};
