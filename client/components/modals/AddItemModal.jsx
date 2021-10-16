import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { wsAddItemToList } from '../../webSocketModule';
import SearchModal from './SearchModal';
import ItemResult from '../ItemResult';

const AddItemModal = () => {
	const [value, setValue] = useState('');
	const [encodedValue, setEncodedValue] = useState('');
	const currentView = useSelector(state => state.app.currentView);
	const newItemListId = useSelector(state => state.sheet.newItemListId);
	const storeId = useSelector(state => state.sheet.store.id);
	const dispatch = useDispatch();

	// URL-encode input value
	useEffect(() => setEncodedValue(encodeURIComponent(value)), [value]);

	return (
		<SearchModal
			iconName="shopping_cart"
			title="Add an item"
			className="AddItemModal"
			inputState={[value, setValue]}
			resultComponent={ItemResult}
			apiUrl="/findProducts/{}?term={}"
			searchArgs={[storeId, encodedValue]}
			onResultSelect={item =>
				dispatch(wsAddItemToList({ item, listId: newItemListId }))
			}
			isVisible={currentView === 'add-item'}
		/>
	);
};

export default AddItemModal;
