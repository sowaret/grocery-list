import { setCurrentView } from '../../features/appSlice';
import { addItemToList, addStoreProduct } from '../../features/sheetSlice';

const generateItemObject = ({ newItemListId, listItem }) => ({
	listId: newItemListId,
	listItemId: listItem._id,
	itemDetails: {
		storeProductId: listItem.store_product._id,
		quantity: 1,
		...(listItem.sale_price && { salePrice: listItem.sale_price }),
	},
});

const generateStoreProductObject = listItem => {
	const { _id, aisle, price, product } = listItem.store_product;
	const { productId, name } = product;

	return {
		storeProductId: _id,
		storeProductDetails: { productId, name, aisle, price },
	};
};

export default addItemAndStoreProductToList = ({
	newItemListId,
	data,
	dispatch,
}) => {
	dispatch(setCurrentView(null));
	if (data.exists) return;

	const { listItem } = data;
	// Update StoreProduct data if it was added to this sheet
	if (!data.storeProductExists)
		dispatch(addStoreProduct(generateStoreProductObject(listItem)));

	// Add item if it does not already exist
	dispatch(addItemToList(generateItemObject({ newItemListId, listItem })));
};
