import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentView } from '../../features/appSlice';
import useClasses from '../../hooks/useClasses';
import useTimeout from '../../hooks/useTimeout';
import Modal from './Modal';
import './styles/SheetWelcome.css';

const SheetWelcomeModal = () => {
	const [passwordCopied, setPasswordCopied] = useState(false);
	const code = useSelector(state => state.sheet.code);
	const password = useSelector(state => state.sheet.password);
	const isVisible =
		useSelector(state => state.app.currentView) === 'sheet-welcome';
	const [resetPasswordCopyTimeout] = useTimeout(
		() => setPasswordCopied(false),
		5000
	);
	const dispatch = useDispatch();

	const copyPasswordToClipboard = () => {
		navigator.clipboard.writeText(password);
		setPasswordCopied(true);
		resetPasswordCopyTimeout();
	};

	useEffect(() => {
		if (!password) return;
		dispatch(setCurrentView('sheet-welcome'));
	}, [password]);

	return (
		<Modal iconName="receipt_long" title="Sheet details" isVisible={isVisible}>
			<div className="sheet-welcome">
				Sheet code:
				<div className="sheet-welcome__code">{code}</div>
				Password:
				<div
					className={useClasses(
						'sheet-welcome__password',
						passwordCopied && 'highlight'
					)}
					title="Copy to clipboard"
					onClick={copyPasswordToClipboard}
				>
					{password}
				</div>
				<div className="sheet-welcome__password-copied">copied</div>
				<div className="sheet-welcome__note">
					Use these to rejoin this sheet.
				</div>
				<button
					className="sheet-welcome__change-password"
					onClick={() => dispatch(setCurrentView('sheet-details-password'))}
				>
					Change password
				</button>
			</div>
		</Modal>
	);
};

export default SheetWelcomeModal;
