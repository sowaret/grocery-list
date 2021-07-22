const capitalizeString = string =>
	string.charAt(0).toUpperCase() + string.slice(1);

module.exports = {
	capitalize: input => {
		if (typeof input === 'string') return capitalizeString(input);
		if (Array.isArray(input)) return input.map(string =>
			capitalizeString(string)
		);
		throw 'capitalize() parameter must be a string or an array';
	},
	formatCurrentDate: _ => {
		const date = new Date();
		return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
	},

	// Set leadingDollarSign to `false` to enable custom styling in CSS `::before`
	formatPrice: (price, leadingDollarSign = true, allowZero) => {
		return price || allowZero
			? `${leadingDollarSign ? '$' : ''}${ price.toFixed(2) }`
			: null;
	},

	formatString: (string, ...args) => {
		let i = 0;
		return string.replace(/{}/g, _ => {
			return typeof args[i] !== 'undefined' ? args[i++] : '';
		});
	},

	lowercase: input => {
		if (typeof input === 'string') return input.toLowerCase();
		if (Array.isArray(input)) return input.map(string =>
			string.toLowerCase()
		);
		throw 'lowercase() parameter must be a string or an array';
	},
};
