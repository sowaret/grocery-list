import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentView } from '../../features/appSlice';
import { setStore } from '../../features/sheetSlice';
import { wsChangeStore } from '../../webSocketModule';
import SearchModal from './SearchModal';
import StoreResult from '../StoreResult';

const StoreSearchModal = _ => {
	const [value, setValue] = useState(''),
		currentView = useSelector(state => state.app.currentView),
		sheetId = useSelector(state => state.sheet.id),
		dispatch = useDispatch(),

		changeStore = storeDetails => dispatch(
			wsChangeStore({ sheetId, storeDetails })
		);

	return <SearchModal
		iconName = "store"
		title = "Find a store"
		inputPlaceholder = "Enter ZIP code..."
		inputState = {[ value, setValue ]}
		resultComponent = {StoreResult}
		apiUrl = "/findStores/{}"
		searchArgs = {[ value ]}
		onResultSelect = {changeStore}
		isVisible = {currentView === 'store-search'}
		/>;
};

export default StoreSearchModal;
