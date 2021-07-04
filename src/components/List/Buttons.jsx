import React from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentView } from '../../features/appSlice';
import {
	setChecklistListId,
	setClaimColumnListId,
	setNewItemListId,
	showClaimColumn,
} from '../../features/sheetSlice';

const ListButtons = ({ claimColumnListId, isHover, listId, newItemListId }) => {
	const dispatch = useDispatch();

	const handleAddItemButtonClick = _ => {
		if (newItemListId !== listId) dispatch(setNewItemListId(listId));
		dispatch(setCurrentView('add-item'));
	};
	const handleClaimButtonClick = _ => {
		if (claimColumnListId !== listId) dispatch(setClaimColumnListId(listId));
		dispatch(showClaimColumn());
	};
	const handleViewChecklistButtonClick = _ => {
		dispatch(setChecklistListId(listId));
		dispatch(setCurrentView('checklist'));
	}

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
	].map(({ icon, onClick, title }, key) => React.createElement(
		'div',
		{ className: buttonClasses, key, onClick, title },
		icon
	));

	const className = [
		'list-buttons-container',
		...isHover ? ['show'] : '',
	].join(' ');

	return React.createElement('div', { className }, buttonsDisplay);
};

export default ListButtons;
