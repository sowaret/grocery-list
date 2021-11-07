const { hash } = require('../../utils/salter');
const validate = require('./validation');

const changeSheet = {
	password: async params => {
		try {
			const sheet = await validate.passwordChange(params);
			const { newPassword } = params;
			sheet.password = hash(newPassword, '').passwordHash;
			await sheet.save().catch(err => {
				throw 'CHANGE_SHEET_PASSWORD';
			});
		} catch (error) {
			throw { method: 'changeSheetPassword', error };
		}
	},

	store: async ({ sheetId, storeDetails }) => {
		const { sheet, store } = await validate.changeStoreRequirements({
			sheetId,
			storeDetails,
		});
		sheet.store = store;
		await sheet.save().catch(err => {
			throw 'CHANGE_STORE';
		});

		const { name, store_id: id } = store;
		return { id, name };
	},
};

module.exports = changeSheet;
