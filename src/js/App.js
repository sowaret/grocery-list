import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Components
import AddItemModal from '../components/modals/AddItemModal';
import JoinSheetModal from '../components/modals/JoinSheetModal';
import SheetDetailsModal from '../components/modals/SheetDetailsModal';
import StoreSearchModal from '../components/modals/StoreSearchModal';
import UserModal from '../components/modals/UserModal';
import Sheet from '../components/Sheet';
import SideMenu from '../components/SideMenu';
// Other imports
import { wsConnect } from '../webSocketModule';

const App = _ => {
	const { currentPOST, currentView } = useSelector(state => state.app);
	const { isSorting, showClaimColumn } = useSelector(state => state.sheet);

	// Classes
	const classes = [
		'App',
		...isSorting ? ['sorting'] : '',
		...currentPOST ? [`posting-${currentPOST}`] : '',
		...currentView ? ['no-scroll'] : '',
		...showClaimColumn ? ['show-claim-column'] : '',
	].join(' ');

	const rootRef = useRef();
	const dispatch = useDispatch();

	// On mount, establish websocket connection
	useEffect(_ => {
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
