import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Components
import AddItemModal from './modals/AddItemModal';
import JoinSheetModal from './modals/JoinSheetModal';
import SheetDetailsModal from './modals/SheetDetailsModal';
import SheetWelcomeModal from './modals/SheetWelcome';
import StoreSearchModal from './modals/StoreSearchModal';
import UserModal from './modals/UserModal';
import Sheet from './Sheet';
import SideMenu from './SideMenu';
// Other imports
import useClasses from '../hooks/useClasses';
import { wsConnect } from '../webSocketModule';

const App = () => {
	const { currentPOST, currentView } = useSelector(state => state.app);
	const isSorting = useSelector(state => state.sheet.isSorting);
	const showClaimColumn = useSelector(state => state.sheet.showClaimColumn);

	const classes = useClasses(
		'App',
		isSorting && 'sorting',
		currentPOST && `posting-${currentPOST}`,
		currentView && 'no-scroll',
		showClaimColumn && 'show-claim-column'
	);
	const rootRef = useRef();
	const dispatch = useDispatch();

	// On mount, establish websocket connection
	useEffect(() => {
		dispatch(
			wsConnect(
				location.protocol.replace(/^http/, 'ws') +
					location.hostname +
					':' +
					process.env.WS_SERVER_PORT
			)
		);
	}, []);

	return (
		<div className={classes} ref={rootRef}>
			<SideMenu />
			<Sheet appRoot={rootRef} />
			<UserModal />
			<SheetWelcomeModal />
			<JoinSheetModal />
			<SheetDetailsModal />
			<StoreSearchModal />
			<AddItemModal />
		</div>
	);
};

export default App;
