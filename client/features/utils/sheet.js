export const STORE_DEFAULT = { id: null, name: '' };

export const ensureArray = payload => (payload && [payload]) || [];

export const mapStoreProductsToListItemData = ({ listId, state }) => {
	const { items } = state.lists[listId];
	return Object.fromEntries(
		Object.entries(items).map(([itemId, { claimedBy, storeProductId }]) => [
			storeProductId,
			{
				claimedBy,
				itemId,
				...(claimedBy && { userColour: state.users[claimedBy].customColour }),
			},
		])
	);
};

export const updateItemField = (state, payload, field) => {
	const lists = { ...state.lists };
	const { listId, itemId, [field]: value } = payload;
	lists[listId].items[itemId][field] = value;
	state.lists = lists;
};

export const updateStoreProductsWithListItemIds = ({
	listItemStoreProducts,
	state,
}) => {
	const storeProducts = {};
	Object.keys(state.storeProducts).map(spid => {
		const listItemData = listItemStoreProducts[spid] || {
			claimedBy: null,
			itemId: null,
			userColour: null,
		};

		storeProducts[spid] = {
			...state.storeProducts[spid],
			...(listItemData && listItemData),
		};
	});
	return storeProducts;
};
