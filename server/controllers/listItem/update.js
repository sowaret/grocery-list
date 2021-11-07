const { ListItem } = require('../../models');

const getListItemById = async _id => {
	const listItem = await ListItem.findOne({ _id }).catch(err => {
		throw 'FIND_LIST_ITEM';
	});
	if (listItem) return listItem;
	throw 'LIST_ITEM_NOT_FOUND';
};

const updateListItemField = async (listItem, fieldName, value, enumIfError) => {
	listItem[fieldName] = value;
	await listItem.save().catch(err => {
		throw enumIfError;
	});
	return { updated: true };
};

const updateListItem = {
	checked: async ({ checked, itemId }) => {
		const listItem = await getListItemById(itemId);
		if (listItem.checked === checked) return;

		await updateListItemField(
			listItem,
			'checked',
			checked,
			'UPDATE_LIST_ITEM_CHECKED'
		);
		return { updated: true };
	},

	claimedBy: async (listItemId, claimedByUserDocument) => {
		const listItem = await getListItemById(listItemId);
		if (listItem.claimedBy === claimedByUserDocument) return;

		await updateListItemField(
			listItem,
			'claimedBy',
			claimedByUserDocument,
			'UPDATE_LIST_ITEM_CLAIMED_BY'
		);

		return { id: claimedByUserDocument ? claimedByUserDocument.id : null };
	},

	quantity: async (listItemId, quantity) => {
		const listItem = await getListItemById(listItemId);
		if (quantity === listItem.quantity) return;

		return await updateListItemField(
			listItem,
			'quantity',
			quantity,
			'UPDATE_LIST_ITEM_QUANTITY'
		);
	},
};

module.exports = updateListItem;
