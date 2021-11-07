const fs = require('fs');

module.exports = updateEnvFile = newValues => {
	// Update environment
	for (const key in newValues) process.env[key] = newValues[key];
	// Update .env file
	const envContents = fs
		.readFileSync('.env')
		.toString()
		.split('\n')
		.map(line => line.split(/=(.+)/)) // Split at first equal sign
		.map(([key, value]) =>
			value // Update/retain key-value lines
				? `${key}=${key in newValues ? newValues[key] : value}`
				: // Retain non-key-value lines
				  key
		)
		.join('\n');

	fs.writeFileSync('.env', envContents);
};
