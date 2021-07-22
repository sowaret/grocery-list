import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentView } from '../../features/appSlice';
import { fadeInModal, fadeOutModal } from '../utils/Modals';
import './styles/Modals';

const Modal = ({
	iconName,
	title,
	className = '',
	onOpen = _ => {},
	disableCloseOnFadeClick = false,
	isVisible,
	children,
}) => {
	const classes = [
			'Modal',
			...className ? [className] : '',
			...isVisible ? ['visible'] : '',
		].join(' '),

		openModal = _ => {
			fadeInModal(baseElementRef, containerElementRef);
			onOpen();
		},

		closeModal = e => {
			if (e && (
				// Do not close if content was clicked
				e.target !== baseElementRef.current
				// Do not close if this is disabled
				|| disableCloseOnFadeClick
			)) return;

			// Reset the current view to trigger the modal to close
			dispatch(setCurrentView(null));
		},

		baseElementRef = useRef(),
		containerElementRef = useRef(),

		dispatch = useDispatch();

	useEffect(_ => {
		if (isVisible) openModal(); else fadeOutModal(baseElementRef);
	}, [isVisible]);

	return (
		<div
			className = {classes}
			onClick = {closeModal}
			ref = {baseElementRef}
			>

			<div
				className = "modal-container"
				ref = {containerElementRef}
				>

				<h1 className="modal-header">
					<span className="modal-header-icon material-icons">{iconName}</span>
					<span className="modal-header-text">{title}</span>
				</h1>

				<div className="modal-body">

					{children}

				</div>
			</div>
		</div>
	);
};

export default Modal;
