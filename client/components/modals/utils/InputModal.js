import { capitalize } from '../../../js/functions';

const refValueMutators = {
	username: value => value.trim(),
};

export const generateConfirmPasswordValidation = ({
	fields,
	additionalBoolean = true,
	passwordField = 'password',
}) => ({
	confirmPassword: {
		allowEmpty: true,
		invalidate: () => {
			const isInvalid =
				additionalBoolean &&
				// If passwords are not equal
				(fields.get(passwordField) !== fields.get('confirmPassword') ||
					// Always show error if password is empty
					!fields.get(passwordField));

			return isInvalid
				? ['Password and confirmation password must match.']
				: [];
		},
	},
});

export const generateFieldRefs = _fields => {
	const { useRef, ...fields } = _fields;
	if (!useRef) throw 'Must pass `useRef` to generateFieldRefs';
	if ('get' in fields) throw '`get` is not an acceptable field name';

	const refData = {
		get: key => {
			const value = refData[key].ref.current.value;
			const mutator = refValueMutators[key];
			return (mutator && mutator(value)) || value;
		},
		set: (key, value) => {
			refData[key].ref.current.value = value;
		},
	};
	Object.entries(fields).map(([key, options]) => {
		const { label, ...rest } = options;
		refData[key] = {
			...rest,
			label: capitalize(label || key),
			ref: useRef(),
		};
	});
	return refData;
};
