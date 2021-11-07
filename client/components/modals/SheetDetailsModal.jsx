import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentView } from '../../features/appSlice';
import { setDetailsError } from '../../features/sheetSlice';
import { wsChangeSheetPassword } from '../../webSocketModule';
import InputModal from './InputModal';
import {
	generateConfirmPasswordValidation,
	generateFieldRefs,
} from './utils/InputModal';

const SheetDetailsModal = () => {
	const { currentPOST, currentView } = useSelector(state => state.app);
	const oldPassword = useSelector(state => state.sheet.password);
	// InputModal requirements
	const isVisible = currentView && currentView.startsWith('sheet-details-');
	const context = isVisible && currentView.split('sheet-details-')[1];
	const title =
		context === 'password' ? 'Change sheet password' : 'Sheet details';
	const reduxPOST = 'sheet-details';
	const isPOSTing = currentPOST === reduxPOST;

	// For responseErr
	const { detailsError } = useSelector(state => state.sheet);
	const dispatch = useDispatch();

	const fields = generateFieldRefs({
		useRef,
		oldPassword: { label: 'old password', type: 'password' },
		newPassword: { label: 'new password', type: 'password' },
		confirmPassword: { label: 'confirm password', type: 'password' },
	});

	const focusNextInput = () => {
		let field = 'oldPassword';
		if (fields.get('oldPassword'))
			if (fields.get('newPassword')) field = 'confirmPassword';
			else field = 'newPassword';

		fields[field].ref.current.focus();
	};

	const additionalValidation = generateConfirmPasswordValidation({
		fields,
		passwordField: 'newPassword',
	});

	useEffect(() => {
		fields.set('oldPassword', oldPassword);
	}, [oldPassword]);
	// Reset form on success
	useEffect(() => {
		if (currentView === 'sheet-details-password-success') {
			fields.set('oldPassword', '');
			fields.set('newPassword', '');
			fields.set('confirmPassword', '');
			dispatch(setCurrentView());
		}
	}, [currentView]);

	return React.createElement(InputModal, {
		iconName: context,
		title,
		disableCloseOnFadeClick: false,
		classes: ['SheetDetailsModal'],
		isVisible,
		additionalValidation,
		buttonLabel: context === 'password' && 'Change password',
		fields,
		focusNextInput,
		isPOSTing,
		reduxPOST,
		responseErr: detailsError,
		responseErrorFocusField: 'newPassword',
		responseErrorReducer: setDetailsError,
		webSocketSuccessReducer: wsChangeSheetPassword,
	});
};

export default SheetDetailsModal;
