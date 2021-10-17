import React from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentView } from '../../features/appSlice';
import {
	setChecklistListId,
	setClaimColumnListId,
	setNewItemListId,
	showClaimColumn,
} from '../../features/sheetSlice';
import useClasses from '../../hooks/useClasses';

const ListButtons = ({ claimColumnListId, isHover, listId, newItemListId }) => {
	const className = useClasses('list-buttons-container', isHover && 'show');
	const dispatch = useDispatch();

	const handleAddItemButtonClick = () => {
		if (newItemListId !== listId) dispatch(setNewItemListId(listId));
		dispatch(setCurrentView('add-item'));
	};
	const handleClaimButtonClick = () => {
		if (claimColumnListId !== listId) dispatch(setClaimColumnListId(listId));
		dispatch(showClaimColumn());
	};
	const handleViewChecklistButtonClick = () => {
		dispatch(setChecklistListId(listId));
		dispatch(setCurrentView('checklist'));
	};

	const buttonClasses = 'list__button circle material-icons';
	const buttonsDisplay = [
		{
			icon: 'add_shopping_cart',
			onClick: handleAddItemButtonClick,
			title: 'Add item',
		},
		{
			icon: 'front_hand',
			onClick: handleClaimButtonClick,
			title: 'Claim items for your list',
		},
		{
			icon: 'checklist',
			onClick: handleViewChecklistButtonClick,
			title: 'View checklist',
		},
	].map(({ icon, onClick, title }, key) =>
		React.createElement(
			'div',
			{ className: buttonClasses, key, onClick, title },
			icon
		)
	);

	return React.createElement('div', { className }, buttonsDisplay);
};

export default ListButtons;
