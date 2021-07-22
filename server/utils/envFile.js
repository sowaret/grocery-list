const fs = require('fs');
const envItems = ['AUTH_STRING', 'TOKEN', 'TOKEN_EXPIRES_AT'];

module.exports = updateEnvFile = newValues => {
	for (const key in newValues) process.env[key] = newValues[key];

	const envContents = envItems
		.map(item => `${item}=${process.env[item]}`)
		.join('\n');

	fs.writeFileSync('.env', envContents);
};
