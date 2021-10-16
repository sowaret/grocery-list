import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Components
import AddItemModal from './modals/AddItemModal';
import JoinSheetModal from './modals/JoinSheetModal';
import SheetDetailsModal from './modals/SheetDetailsModal';
import StoreSearchModal from './modals/StoreSearchModal';
import UserModal from './modals/UserModal';
import Sheet from './Sheet';
import SideMenu from './SideMenu';
// Other imports
import { wsConnect } from '../webSocketModule';

const App = () => {
	const { currentPOST, currentView } = useSelector(state => state.app);
	const { isSorting, showClaimColumn } = useSelector(state => state.sheet);

	// Classes
	const classes = [
		'App',
		...(isSorting ? ['sorting'] : ''),
		...(currentPOST ? [`posting-${currentPOST}`] : ''),
		...(currentView ? ['no-scroll'] : ''),
		...(showClaimColumn ? ['show-claim-column'] : ''),
	].join(' ');

	const rootRef = useRef();
	const dispatch = useDispatch();

	// On mount, establish websocket connection
	useEffect(() => {
		dispatch(wsConnect('ws://localhost:8080'));
	}, []);

	return (
		<div className={classes} ref={rootRef}>
			<SideMenu />
			<Sheet appRoot={rootRef} />
			<UserModal />
			<JoinSheetModal />
			<SheetDetailsModal />
			<StoreSearchModal />
			<AddItemModal />
		</div>
	);
};

export default App;
