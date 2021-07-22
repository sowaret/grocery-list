import addItemAndStoreProductToList from '../../components/utils/AddItemModal';
import { appendList, renameList } from '../../features/sheetSlice';

module.exports = {
	ADD_ITEM_TO_LIST: {
		parameters: ['item', 'listId'],
		reducer: ({ dispatch, payload }) =>
			addItemAndStoreProductToList({
				data: payload.data,
				newItemListId: payload.listId,
				dispatch,
			}),
		reducerName: 'ADDED_ITEM_TO_LIST',
	},
	CREATE_LIST: {
		parameters: 'name',
		reducer: ({ dispatch, payload }) => dispatch(appendList(payload.list)),
		reducerName: 'CREATED_LIST',
	},
	RENAME_LIST: {
		parameters: ['sheetId', 'listId', 'newName'],
		reducer: ({ dispatch, payload }) => {
			const { listId, newName } = payload;
			dispatch(renameList({ listId, newName }));
		},
		reducerName: 'RENAMED_LIST',
	},
};
