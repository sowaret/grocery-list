export const joinClasses = (className, booleanAndValue) => {
	const [boolean, value] = Array.isArray(booleanAndValue)
		? booleanAndValue
		: [booleanAndValue, booleanAndValue];
	return [className, ...(boolean ? [value] : '')].join(' ');
};
