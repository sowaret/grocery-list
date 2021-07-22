import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { wsAddItemToList } from '../../webSocketModule';
import addItemAndStoreProductToList from '../utils/AddItemModal';
import SearchModal from './SearchModal';
import ItemResult from '../ItemResult';

const AddItemModal = _ => {
	const [value, setValue] = useState(''),
		[encodedValue, setEncodedValue] = useState(''),
		currentView = useSelector(state => state.app.currentView),
		newItemListId = useSelector(state => state.sheet.newItemListId),
		storeId = useSelector(state => state.sheet.store.id),

		dispatch = useDispatch();

	// URL-encode input value
	useEffect(_ => setEncodedValue(encodeURIComponent(value)),
		[value]);

	return <SearchModal
		iconName = "shopping_cart"
		title = "Add an item"
		className = "AddItemModal"
		inputState = {[ value, setValue ]}
		resultComponent = {ItemResult}
		apiUrl = "/findProducts/{}?term={}"
		searchArgs = {[ storeId, encodedValue ]}
		onResultSelect = {item =>
			dispatch(wsAddItemToList({ item, listId: newItemListId }))
		}
		isVisible = {currentView === 'add-item'}
		/>;
};

export default AddItemModal;
