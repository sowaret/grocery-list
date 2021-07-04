import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDetailsError } from '../../features/sheetSlice';
import { wsChangeSheetPassword } from '../../webSocketModule';
import InputModal from './InputModal';
import {
	generateConfirmPasswordValidation,
	generateFieldRefs,
} from './utils/InputModal';

const SheetDetailsModal = _ => {
	const { currentPOST, currentView } = useSelector(state => state.app);
	const dispatch = useDispatch();
	// InputModal requirements
	const isVisible = currentView && currentView.startsWith('sheet-details-');
	const context = isVisible && currentView.split('sheet-details-')[1];
	const title = context === 'password'
		? 'Change sheet password'
		: 'Sheet details';
	const reduxPOST = 'sheet-details';
	const isPOSTing = currentPOST === reduxPOST;

	// For responseErr
	const { detailsError } = useSelector(state => state.sheet);

	const fields = generateFieldRefs({
		useRef,
		oldPassword: { label: 'old password', type: 'password' },
		newPassword: { label: 'new password', type: 'password' },
		confirmPassword: { label: 'confirm password', type: 'password' },
	});

	const focusNextInput = _ => {
		let field = 'oldPassword';
		if (fields.get('oldPassword'))
			if (fields.get('newPassword'))
				field = 'confirmPassword';
			else field = 'newPassword';

		fields[field].ref.current.focus();
	};

	const additionalValidation = generateConfirmPasswordValidation({
		fields,
		passwordField: 'newPassword',
	});

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
