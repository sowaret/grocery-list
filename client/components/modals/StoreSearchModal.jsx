import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { wsChangeStore } from '../../webSocketModule';
import SearchModal from './SearchModal';
import StoreResult from '../StoreResult';

const StoreSearchModal = () => {
	const [value, setValue] = useState('');
	const currentView = useSelector(state => state.app.currentView);
	const sheetId = useSelector(state => state.sheet.id);
	const dispatch = useDispatch();

	const changeStore = storeDetails =>
		dispatch(wsChangeStore({ sheetId, storeDetails }));

	return (
		<SearchModal
			iconName="store"
			title="Find a store"
			inputPlaceholder="Enter ZIP code..."
			inputState={[value, setValue]}
			resultComponent={StoreResult}
			apiUrl="/findStores/{}"
			searchArgs={[value]}
			onResultSelect={changeStore}
			isVisible={currentView === 'store-search'}
		/>
	);
};

export default StoreSearchModal;
