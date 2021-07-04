import {
	updateItemChecked,
	updateItemClaimedBy,
	updateItemQuantity,
} from '../../features/sheetSlice';

const updateItem_action = ({ field, param, reducer, reducerName }) => ({
	parameters: [param || field, 'itemId', 'listId'],
	reducer: ({ dispatch, payload }) => {
		const { itemId, listId } = payload;
		dispatch(reducer({ [field]: payload[field], itemId, listId }));
	},
	reducerName,
});

module.exports = {
	UPDATE_ITEM_CHECKED: updateItem_action({
		field: 'checked',
		reducer: updateItemChecked,
		reducerName: 'UPDATED_ITEM_CHECKED',
	}),
	UPDATE_ITEM_CLAIMED_BY: updateItem_action({
		field: 'claimedBy',
		param: 'userId',
		reducer: updateItemClaimedBy,
		reducerName: 'UPDATED_ITEM_CLAIMED_BY',
	}),
	UPDATE_ITEM_QUANTITY: updateItem_action({
		field: 'quantity',
		reducer: updateItemQuantity,
		reducerName: 'UPDATED_ITEM_QUANTITY',
	}),
};
