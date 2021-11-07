const arrayMove = require('array-move');
const { generateRandomCode } = require('../../functions');
const { Sheet } = require('../../models');
const { hash } = require('../../utils/salter');
const { generateSheetCode } = require('../utils/sheet');
const changeSheet = require('./change');
const getSheet = require('./get');

const addNewUserToSheet = async ({ sheetDocument, userDocument }) => {
	const userIds = sheetDocument.users.map(x => x._id.toString());
	// Do nothing if this user has already been added in the database
	if (sheetDocument.users.some(x => x._id.toString() === userDocument.id))
		return;

	sheetDocument.users.push(userDocument);
	await sheetDocument.save().catch(err => {
		throw 'ADD_USER_TO_SHEET';
	});

	return true;
};

const createSheet = async ({ owner }) => {
	try {
		const generatedPassword = generateRandomCode(8, true);
		const password = hash(generatedPassword, '').passwordHash;
		const newSheet = new Sheet({
			code: await generateSheetCode(),
			owner,
			password,
		});
		await newSheet.save().catch(err => {
			throw 'CREATE_SHEET';
		});
		return { document: newSheet, password: generatedPassword };
	} catch (error) {
		throw { method: 'createSheet', error };
	}
};

const updateSheetStoreProductSort = async (
	sheetId,
	oldIndex,
	newIndex,
	storeProductId
) => {
	try {
		const sheet =
			sheetId instanceof Sheet ? sheetId : (await getSheet.byId(sheetId)).sheet;
		const storeProducts = [...sheet.store_products];

		// Ensure we are trying to move the correct item
		if (storeProducts[oldIndex]._id.toString() !== storeProductId)
			throw 'MISMATCH_STORE_PRODUCT';

		sheet.store_products = arrayMove(storeProducts, oldIndex, newIndex);
		await sheet.save().catch(err => {
			throw 'UPDATE_SHEET_STORE_PRODUCT_SORT';
		});
	} catch (error) {
		throw { method: 'updateSheetStoreProductSort', error };
	}
};

module.exports = {
	addNewUserToSheet,
	changeSheet,
	createSheet,
	getSheet,
	updateSheetStoreProductSort,
};
