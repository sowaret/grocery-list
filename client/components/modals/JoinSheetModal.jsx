import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPOST, setCurrentView } from '../../features/appSlice';
import { setJoinError } from '../../features/sheetSlice';
import { wsCreateSheet, wsJoinSheet } from '../../webSocketModule';
import InputModal from './InputModal';
import { generateFieldRefs } from './utils/InputModal';
import './styles/JoinSheetModal.css';

const JoinSheetModal = () => {
	const dispatch = useDispatch();
	// InputModal requirements
	const title = 'Open sheet';
	const reduxPOST = 'sheet-modal';
	const { currentPOST } = useSelector(state => state.app);
	const isPOSTing = currentPOST === reduxPOST;

	// For responseErr and isVisible
	const { joinError, id: sheetId } = useSelector(state => state.sheet);
	const { _id: userId } = useSelector(state => state.user);

	const fields = generateFieldRefs({
		useRef,
		sheetCode: {
			label: 'Sheet code',
			maxLength: 4,
			sectionClass: 'center',
			onChange: () => {
				if (fields.get('sheetCode').trim().length < 4) return;
				fields.password.ref.current.focus();
			},
		},
		password: { sectionClass: 'center', type: 'password' },
	});

	const focusNextInput = () => {
		if (fields.get('sheetCode').trim().length === 4)
			return fields.password.ref.current.select();
		fields.sheetCode.ref.current.focus();
	};

	// JoinSheetModal-specific
	const handleCreate = () => {
		dispatch(setJoinError());
		dispatch(setCurrentPOST(reduxPOST));
		dispatch(wsCreateSheet());
	};

	const openSideMenu = e => {
		e.target.blur();
		dispatch(setCurrentView('side-menu'));
	};

	return React.createElement(
		InputModal,
		{
			iconName: 'description',
			title,
			classes: ['JoinSheetModal'],
			isVisible: userId && userId !== 'unset' && !sheetId,
			buttonLabel: title,
			fields,
			focusNextInput,
			isPOSTing,
			reduxPOST,
			responseErr: joinError,
			responseErrorFocusField: 'password',
			responseErrorReducer: setJoinError,
			webSocketSuccessReducer: wsJoinSheet,
		},
		<div className="input-modal__secondary">
			or
			<button type="button" onClick={handleCreate} disabled={isPOSTing}>
				create a new sheet
			</button>
			<button className="settings" type="button" onClick={openSideMenu}>
				Open user settings
			</button>
		</div>
	);
};

export default JoinSheetModal;
