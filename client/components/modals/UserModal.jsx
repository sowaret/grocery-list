import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserError } from '../../features/userSlice';
import useClasses from '../../hooks/useClasses';
import { wsLogInUser, wsRegisterUser } from '../../webSocketModule';
import InputModal from './InputModal';
import {
	generateConfirmPasswordValidation,
	generateFieldRefs,
} from './utils/InputModal';
import './styles/UserModal.css';

const UserModal = () => {
	// UserModal-specific
	const [isRegistering, _setIsRegistering] = useState(false);
	const setIsRegistering = value => {
		_setIsRegistering(value);
		dispatch(setUserError());
		setInputErrors([]);
		setTimeout(() => focusNextInput());
	};
	const dispatch = useDispatch();
	// InputModal requirements
	const title = isRegistering ? 'Register' : 'Log in';
	const inputErrorState = ([inputErrors, setInputErrors] = useState([]));
	const reduxPOST = 'user';
	const { currentPOST } = useSelector(state => state.app);
	const isPOSTing = currentPOST === reduxPOST;
	const classes = useClasses('UserModal', isRegistering && 'register');

	// For responseErr and isVisible
	const { _id: userId, error } = useSelector(state => state.user);

	const fields = generateFieldRefs({
		useRef,
		username: {},
		password: { type: 'password' },
		confirmPassword: {
			label: 'confirm password',
			sectionClass: 'show-register',
			type: 'password',
		},
	});

	const focusNextInput = () => {
		if (fields.username.ref.current.value) {
			if (fields.password.ref.current.value && !isRegistering)
				return fields.confirmPassword.ref.current.select();
			return fields.password.ref.current.select();
		}
		fields.username.ref.current.focus();
	};

	const additionalValidation = generateConfirmPasswordValidation({
		fields,
		additionalBoolean: isRegistering,
	});

	return React.createElement(
		InputModal,
		{
			iconName: isRegistering ? 'person_add_alt' : 'person_outline',
			title,
			classes,
			isVisible: !userId,
			additionalValidation,
			buttonLabel: title,
			inputErrorState,
			isPOSTing,
			fields,
			focusNextInput,
			reduxPOST,
			webSocketSuccessReducer: isRegistering ? wsRegisterUser : wsLogInUser,
			responseErr: error,
			responseErrorFocusField: 'password',
			responseErrorReducer: setUserError,
		},
		<div className="input-modal__secondary">
			or
			<button
				type="button"
				onClick={() => setIsRegistering(!isRegistering)}
				disabled={isPOSTing}
			>
				{isRegistering ? 'log in' : 'register'}
			</button>
		</div>
	);
};

export default UserModal;
