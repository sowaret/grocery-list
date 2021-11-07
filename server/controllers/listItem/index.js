const { List, ListItem, StoreProduct } = require('../../models');
const { getListById } = require('../list');
const { getOrCreateProduct } = require('../product');
const {
	addStoreProductToSheet,
	getOrCreateStoreProduct,
} = require('../storeProduct');
const updateListItem = require('./update');

const addItemToList = async ({ item, listId }) => {
	const populateSheetFields = ['store', 'store_products'];
	const list = await getListById(listId, ['list_items'], populateSheetFields);
	const { product } = await getOrCreateProduct(item);
	const { store } = list.sheet;
	const storeProductDetails = {
		price: item.price.regular,
		aisle: item.aisle.number,
	};
	const { storeProduct } = await getOrCreateStoreProduct(
		store,
		product,
		storeProductDetails
	);
	const listItemResponse = await getOrCreateListItem(list, storeProduct, item);
	// Check whether sheet needs this StoreProduct
	const storeProductExists = await addStoreProductToSheet(
		storeProduct,
		list,
		listItemResponse
	);

	return { listItemResponse, storeProduct, storeProductExists };
};

const getOrCreateListItem = async (list, storeProduct, _options) => {
	// Validate parameters
	if (
		!(list instanceof List) ||
		!(storeProduct instanceof StoreProduct) ||
		typeof _options !== 'object'
	)
		throw 'INVALID_PARAMETER_IN_CONTROLLER';

	// Build options
	const promoPrice = _options.price.promo;
	const options = {
		quantity: 1,
		...(promoPrice && { sale_price: promoPrice }),
	};

	// Return the list item if it already exists
	const listItem = list.list_items.find(
		x => x.store_product.toString() === storeProduct.id
	);
	if (listItem) return { exists: true, listItem };

	// Create ListItem
	const newListItem = await new ListItem({
		store_product: storeProduct,
		...options,
	})
		.save()
		.catch(err => {
			throw 'CREATE_LISTITEM';
		});

	list.list_items.push(newListItem);
	await list.save().catch(err => {
		throw 'PUSH_LIST_ITEM';
	});

	return { listItem: newListItem };
}; // getOrCreateListItem

module.exports = {
	addItemToList,
	getOrCreateListItem,
	updateListItem,
};
