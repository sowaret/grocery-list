import React from 'react';
import { useDispatch } from 'react-redux';
import useClasses from '../hooks/useClasses';
import useUpdateQuantity from '../hooks/useUpdateQuantity';
import { formatPrice } from '../js/functions';
import { wsUpdateItemQuantity } from '../webSocketModule';
import ListItemBase from './ListItemBase';

const ListItem = ({ data, id, listId }) => {
	const item = data;
	const classes = useClasses(
		'list-item--list',
		item.salePrice && 'list-item--sale'
	);
	const dispatch = useDispatch();

	const priceDisplay = (
		<span className="list-item__sale-price">{formatPrice(item.salePrice)}</span>
	);

	const {
		tempQuantity,
		increaseQuantity,
		decreaseQuantity,
		updateQuantity,
		flashElementRef,
	} = useUpdateQuantity({
		reduxSelector: state => state.sheet.lists[listId].items[id].quantity,
		defaultQuantity: item.quantity,
		saveDelay: 1000,
		onUpdate: quantity =>
			dispatch(
				wsUpdateItemQuantity({
					itemId: id,
					listId,
					quantity,
				})
			),
	});

	return (
		<ListItemBase
			className={classes}
			gridAreaId={item.storeProductId}
			priceDisplay={priceDisplay}
			baseElementRef={flashElementRef}
		>
			<span className="list-item__quantity">{tempQuantity}</span>
			<div
				className="list-item__quantity-selector"
				onMouseLeave={updateQuantity}
			>
				<div
					className="list-item__quantity-button material-icons"
					onClick={increaseQuantity}
				>
					keyboard_arrow_up
				</div>
				<div
					className="list-item__quantity-button material-icons"
					onClick={decreaseQuantity}
				>
					keyboard_arrow_down
				</div>
			</div>
		</ListItemBase>
	);
};

export default ListItem;
