import arrayMove from 'array-move';
import {
	mapStoreProductsToListItemData,
	updateStoreProductsWithListItemIds,
} from '../../utils/sheet';

export default {
	addStoreProduct: (state, action) => {
		const storeProducts = {...state.storeProducts};
		const { storeProductId, storeProductDetails } = action.payload;
		storeProducts[storeProductId] = storeProductDetails;
		state.storeProducts = storeProducts;
	},
	reorderStoreProducts: (state, action) => {
		const storeProducts = {...state.storeProducts};
		const { oldIndex, newIndex } = action.payload;
		state.storeProducts = Object.fromEntries(arrayMove(
			Object.entries(storeProducts),
			oldIndex,
			newIndex
		));
	},
	setClaimColumnListId: (state, action) => {
		const listId = action.payload;
		state.claimColumnListId = listId;
		// Update store products with claim information
		const listItemStoreProducts = mapStoreProductsToListItemData({
			listId,
			state,
		});
		state.storeProducts = updateStoreProductsWithListItemIds({
			listItemStoreProducts,
			state,
		});
	},
	setStoreProducts: (state, action) => {
		state.storeProducts = action.payload;
	},
	showClaimColumn: (state, action) => {
		state.showClaimColumn = true;
	},
	toggleClaimColumn: (state, action) => {
		state.showClaimColumn = !state.showClaimColumn;
	},
};
