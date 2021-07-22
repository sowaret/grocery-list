import { updateItemField } from '../../utils/sheet';

export default {
	addItemToList: (state, action) => {
		const { listId, listItemId, itemDetails } = action.payload;
		state.lists[listId].items[listItemId] = itemDetails;
	},
	updateItemChecked: (state, action) => {
		updateItemField(state, action.payload, 'checked');
	},
	updateItemClaimedBy: (state, action) => {
		updateItemField(state, action.payload, 'claimedBy');
		const { claimedBy, itemId, listId } = action.payload;
		const { storeProductId } = state.lists[listId].items[itemId];

		// Don't update claim column if user doesn't have `listId` selected
		if (state.claimColumnListId !== listId) return;
		// Update store product for claim column
		state.storeProducts[storeProductId].claimedBy = claimedBy;
		state.storeProducts[storeProductId].userColour = claimedBy
			? state.users[claimedBy].customColour
			: null;
	},
	updateItemQuantity: (state, action) =>
		updateItemField(state, action.payload, 'quantity'),
};
