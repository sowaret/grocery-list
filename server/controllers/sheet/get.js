const { populateSheetDetails } = require('../utils/sheet');

const getSheetByField = async (filter, populateFields = [], method) => {
	// Convert any `populateFields` string to array
	if (typeof populateFields === 'string') populateFields = [populateFields];
	try {
		// Validate parameters
		if (typeof filter !== 'object' || !Array.isArray(populateFields))
			throw 'INVALID_PARAMETER_IN_CONTROLLER';

		return await populateSheetDetails(filter, populateFields);
	} catch (error) {
		throw { method, error };
	}
};

const getSheet = {
	byCode: (code, populateFields = []) =>
		getSheetByField(
			{ code: code.toUpperCase() },
			populateFields,
			'getSheetByCode'
		),
	byId: (_id, populateFields = []) =>
		getSheetByField({ _id }, populateFields, 'getSheetById'),
};

module.exports = getSheet;
