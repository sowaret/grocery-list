const en = require('../enums');

module.exports = {
	JsonError: (res, _enum) => {
		if (!Object.keys(en.err).includes(_enum)) {
			console.trace();
			throw `JsonError: Key \`${_enum}\` does not exist`;
		}

		return res.status(en.err[_enum].status).json({
			code: en.err[_enum].code,
			messages: [en.err[_enum].message],
		});
	},
};
