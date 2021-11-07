const { hash } = require('../../utils/salter');
const { createStore, getStoreById } = require('../store');
const getSheet = require('./get');

const validate = {
	changeStoreRequirements: async ({ sheetId, storeDetails }) => {
		// Make sure sheet exists
		const { sheet } = await getSheet.byId(sheetId);
		if (!sheet) throw 'SHEET_NOT_FOUND';

		// Find or create store by Kroger ID
		const { store_id } = storeDetails;
		const store = await getStoreById(store_id);
		if (store) return { sheet, store };

		// Create store if it doesn't exist
		const newStore = await createStore(storeDetails);
		return { sheet, store: newStore };
	},

	passwordChange: async ({
		confirmPassword,
		newPassword,
		oldPassword,
		sheetId,
	}) => {
		if (newPassword !== confirmPassword) throw 'CONFIRM_PASSWORD_DOESNT_MATCH';
		if (!oldPassword.length || !newPassword.length)
			throw 'PASSWORD_CANNOT_BE_EMPTY';

		const { sheet } = await getSheet.byId(sheetId);
		const { passwordHash } = hash(oldPassword, '');
		if (passwordHash !== sheet.password) throw 'OLD_PASSWORD_INCORRECT';

		return sheet;
	},
};

module.exports = validate;
