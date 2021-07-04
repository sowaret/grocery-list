import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import anime from 'animejs/lib/anime.min.js';
import { updateItemQuantity } from '../features/sheetSlice';
import API from '../js/apiAccess';
import { formatPrice } from '../js/functions';
import { wsUpdateItemQuantity } from '../webSocketModule';
import ListItemBase from './ListItemBase';

const ListItem = ({ data, id, listId }) => {
	const item = data;
	const reduxQuantity = useSelector(
		state => state.sheet.lists[listId].items[id].quantity
	);
	// Quantity to display, including any changes
	const [tempQuantity, setTempQuantity] = useState(item.quantity);
	// Saved quantity to compare to for update
	const [saveQuantity, setSaveQuantity] = useState(item.quantity);
	const [didMount, setDidMount] = useState(false);

	const classes = [
		'list-item--list',
		...item.salePrice ? ['list-item--sale'] : '',
	].join(' ');

	const priceDisplay = (
		<span className="list-item__sale-price">
			{formatPrice(item.salePrice)}
		</span>
	);

	const quantityTimer = useRef();
	const baseElementRef = useRef();

	const dispatch = useDispatch();

	const increaseQuantity = _ => setTempQuantity(tempQuantity + 1);
	const decreaseQuantity = _ => setTempQuantity(
		Math.max(1, tempQuantity - 1)
	);
	const updateQuantity = _ => {
		clearTimeout(quantityTimer.current);
		if (saveQuantity !== tempQuantity) setSaveQuantity(tempQuantity);
	};

	// On mount
	useEffect(_ => setDidMount(true), []);

	// When the quantity is changed, reset the delay to save that change
	useEffect(_ => {
		if (!didMount) return;

		clearTimeout(quantityTimer.current);
		quantityTimer.current = setTimeout(updateQuantity, 1000);
	}, [tempQuantity]);

	// Apply updated quantity
	useEffect(_ => {
		if (!didMount) return;

		dispatch(wsUpdateItemQuantity({
			itemId: id,
			listId,
			quantity: saveQuantity
		}));

	}, [saveQuantity]);

	// Flash websocket quantity update
	useEffect(_ => {
		if (!didMount) return;

		setTempQuantity(reduxQuantity);
		// Prevent tempQuantity useEffect timer from updating new quantity again
		setTimeout(_ => clearTimeout(quantityTimer.current), 0);

		// Flash update animation
		anime({
			targets: baseElementRef.current,
			background: ['#262', '#222'],
			duration: 800,
			easing: 'linear',
		});
	}, [reduxQuantity]);

	return (
		<ListItemBase
			className={classes}
			gridAreaId={item.storeProductId}
			priceDisplay={priceDisplay}
			baseElementRef={baseElementRef}
		>
			<span className="list-item__quantity">{tempQuantity}</span>
			<div
				className="list-item__quantity-selector"
				onMouseLeave={updateQuantity}
			>
				<div
					className="list-item__quantity-button material-icons"
					onClick={increaseQuantity}
				>keyboard_arrow_up</div>
				<div
					className="list-item__quantity-button material-icons"
					onClick={decreaseQuantity}
				>keyboard_arrow_down</div>
			</div>
		</ListItemBase>
	);
};

export default ListItem;
