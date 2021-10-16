import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatPrice } from '../js/functions';
import ListItemBase from './ListItemBase';
import { wsUpdateItemClaimedBy } from '../webSocketModule';

export const claimIndicatorClass = 'list-item__claim-indicator';
export const isTargetClaimIndicator = target =>
	target.classList.contains(claimIndicatorClass) ||
	target.parentElement.classList.contains(claimIndicatorClass);

const SheetStoreProductsListItem = ({ data, id, index }) => {
	const { claimColumnListId: listId } = useSelector(state => state.sheet);
	const { _id: userId } = useSelector(state => state.user);
	const { aisle, claimedBy, name, itemId, price, userColour } = data;
	const dispatch = useDispatch();

	const claimButtonClasses = [
		claimIndicatorClass,
		...(itemId ? '' : ['disabled']),
		...(claimedBy ? '' : ['unclaimed']),
	].join(' ');

	const priceDisplay = (
		<span className="list-item__price">{formatPrice(price, false)}</span>
	);

	const handleClaimButtonClick = () => {
		if (!itemId) return;
		dispatch(
			wsUpdateItemClaimedBy({
				itemId,
				listId,
				userId: claimedBy === userId ? null : userId,
			})
		);
	};

	return (
		<ListItemBase
			className="list-item--sheet-store-product"
			gridAreaId={id}
			priceDisplay={priceDisplay}
		>
			<div className={claimButtonClasses} onClick={handleClaimButtonClick}>
				<div style={{ backgroundColor: claimedBy && userColour }} />
			</div>
			<div className="list-item__index">#{index + 1}</div>
			<div className="list-item__name" title={name}>
				{name}
			</div>

			<div className="list-item__aisle">{aisle}</div>
		</ListItemBase>
	);
};

export default SheetStoreProductsListItem;
