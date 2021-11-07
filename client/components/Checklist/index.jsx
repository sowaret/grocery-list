import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentView } from '../../features/appSlice';
import { setChecklistListId } from '../../features/sheetSlice';
import UserChecklist from './UserChecklist';
import './styles/Checklist.css';

const getOrderedItemList = ({ storeProducts, items }) => {
	if (!items) return [];

	const itemsByStoreProductId = {};
	for (const [itemId, data] of Object.entries(items))
		itemsByStoreProductId[data.storeProductId] = { itemId, ...data };

	return Object.keys(storeProducts)
		.map(storeProductId => itemsByStoreProductId[storeProductId])
		.filter(x => x);
};

const Checklist = ({ listId }) => {
	const { lists, storeProducts, users } = useSelector(state => state.sheet);
	const { _id: userId } = useSelector(state => state.user);
	const [closeButtonOpacity, setCloseButtonOpacity] = useState(0);
	const items = lists[listId]?.items;
	const contentRef = useRef();
	const scrollTimeoutRef = useRef();
	const dispatch = useDispatch();

	const closeButtonStyle = { opacity: closeButtonOpacity };

	const itemListByUser = { [userId]: [], unclaimed: [] };
	getOrderedItemList({ storeProducts, items }).map(
		({ checked, claimedBy, itemId, storeProductId, quantity }) => {
			const userId = claimedBy || 'unclaimed';
			if (!(userId in itemListByUser)) itemListByUser[userId] = [];
			const { aisle, name, price } = storeProducts[storeProductId];
			itemListByUser[userId].push({
				aisle,
				checked,
				itemId,
				listId,
				name,
				price,
			});
		}
	);
	if (!itemListByUser.unclaimed.length) delete itemListByUser.unclaimed;
	const userChecklists = Object.entries(itemListByUser).map(
		([userId, items], key) => (
			<UserChecklist user={users[userId]} items={items} key={key} />
		)
	);

	const handleChecklistClose = () => {
		clearTimeout(scrollTimeoutRef.current);
		dispatch(setChecklistListId());
		dispatch(setCurrentView());
	};

	const handleScroll = () => {
		clearTimeout(scrollTimeoutRef.current);
		setCloseButtonOpacity(1);
		scrollTimeoutRef.current = setTimeout(() => setCloseButtonOpacity(0), 1250);
	};

	// On mount, bind event listeners
	useEffect(() => {
		const content = contentRef.current;
		content.addEventListener('touchstart', handleScroll);
		content.addEventListener('mousemove', handleScroll);

		return (cleanup = () =>
			content.removeEventListener('touchstart', handleScroll));
	}, []);

	return (
		<div className="checklist">
			<div className="checklist__cover" />
			<div className="checklist__content" ref={contentRef}>
				<div
					className="checklist__close-button material-icons"
					onClick={handleChecklistClose}
					style={closeButtonStyle}
				>
					close
				</div>
				<div className="checklist__lists">{userChecklists}</div>
			</div>
		</div>
	);
};

export default Checklist;
