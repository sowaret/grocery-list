import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentPOST } from '../../features/appSlice';
import { capitalize } from '../../js/functions';
import Modal from './Modal';
import './styles/InputModal';

const InputModal = ({
	iconName,
	title,
	classes,
	disableCloseOnFadeClick = true,
	isVisible,
	additionalValidation = _ => [],
	buttonLabel,
	inputErrorState,
	isPOSTing,
	fields,
	focusNextInput,
	reduxPOST,
	webSocketSuccessReducer,
	responseErr,
	responseErrorFocusField,
	responseErrorReducer,
	children,
}) => {
	if (!classes) throw 'InputModal requires `classes` attribute';
	if (!fields[responseErrorFocusField])
		throw `${classes} responseErrorFocusField is invalid`;

	const [inputErrors, setInputErrors] = inputErrorState || useState([]);
	const className = [
		'InputModal',
		...classes,
		...isPOSTing ? ['posting'] : '',
	].join(' ');
	// Filter out `get` from field refs
	const formFields = Object.fromEntries(
		Object.entries(fields).filter(x => x[0] !== 'get')
	);
	const inputDisplay = Object.entries(formFields).map(([key, field]) => {
		const { label, maxLength, onChange, ref, sectionClass, type } = field;
		const id = `${classes[0]}__${key}`;
		const sectionClasses = [
			'input-modal__section',
			sectionClass,
		].join(' ');
		const input = React.createElement(
			'input',
			{ id, disabled: isPOSTing, maxLength, onChange, ref, type }
		);
		return (
			<div className={sectionClasses} key={key}>
				<label
					className="input-modal__label"
					htmlFor={id}
				>{field.label}:</label>
				{input}
			</div>
		);
	});
	const errorDisplay = [...responseErr, ...inputErrors].map((err, i) => {
		return (
			<div className="input-modal__error" key={i}>
				<div className="error__icon material-icons">warning_amber</div>
				<div>{err}</div>
			</div>
		);
	});
	const submitButton = buttonLabel && (
		<button className="input-modal__submit" disabled={isPOSTing}>
			{buttonLabel}
		</button>
	);
	const dispatch = useDispatch();

	const submitForm = e => {
		e.preventDefault();
		if (!validateInputs()) return;

		dispatch(setCurrentPOST(reduxPOST));
		const data = {};
		for (const key of Object.keys(formFields))
			data[key] = fields.get(key);

		dispatch(webSocketSuccessReducer(data));
	};

	const validateInputs = _ => {
		dispatch(responseErrorReducer());
		const errors = [];
		for (const key of Object.keys(formFields)) {
			// Check for empty values
			if (
				fields.get(key) === ''
				&& additionalValidation[key]?.allowEmpty !== true
			) {
				const { label } = fields[key];
				errors.push(`${label || capitalize(key)} cannot be empty.`);
			}
			// Do any additional validation
			const additionalErrors = additionalValidation[key]?.invalidate();
			if (additionalErrors) errors.push(...additionalErrors);
		}
		setInputErrors(errors);
		if (errors.length) {
			focusNextInput();
			return false;
		}
		return true;
	};

	useEffect(_ => {
		if (responseErr.length) setTimeout(_ =>
			fields[responseErrorFocusField].ref.current.focus()
		);
	}, [responseErr]);

	return React.createElement(Modal, {
		iconName,
		title,
		className,
		disableCloseOnFadeClick,
		onOpen: focusNextInput,
		isVisible,
	}, (
		<form onSubmit={submitForm}>
			{inputDisplay}
			{errorDisplay}
			{submitButton}
			{children}
		</form>
	));
};

export default InputModal;
