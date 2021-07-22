import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentView } from '../features/appSlice';
import { setIsSorting, toggleClaimColumn } from '../features/sheetSlice';
import { getProductGridRowNames } from './utils/Lists';
import updateStoreProductListSort from './utils/SheetStoreProductsList';
import BaseList from './BaseList';
import { isTargetClaimIndicator } from './SheetStoreProductsListItem';
import SortableStoreProductsList from './SortableStoreProductsList';

const SheetStoreProductsList = ({ helperContainer }) => {
	const storeName = useSelector(state => state.sheet.store.name);
	const { showClaimColumn, storeProducts } = useSelector(state => state.sheet);
	const storeProductIdList = Object.keys(storeProducts);

	const onSortEnd = ({ oldIndex, newIndex }) =>
		updateStoreProductListSort({
			dispatch,
			newIndex,
			oldIndex,
			storeProducts,
		});

	const itemsDisplay = React.createElement(SortableStoreProductsList, {
		style: getProductGridRowNames({ storeProductIdList }),
		items: storeProducts,
		helperClass: 'list-item--sorting',
		lockAxis: 'y',
		transitionDuration: 200,
		distance: 1, /* Prevent click from triggering */
		helperContainer,
		onSortStart: _ => dispatch(setIsSorting(true)),
		onSortEnd,
		shouldCancelStart: e => isTargetClaimIndicator(e.target),
	});

	const dispatch = useDispatch();

	const toggleClaimColumnAndBlurButton = e => {
		e.target.blur();
		dispatch(toggleClaimColumn());
	};

	return (
		<BaseList
			className="SheetStoreProductsList"
			itemsDisplay={itemsDisplay}
		>
			<div className="store-header">
				<button
					className="header__menu-button material-icons"
					title="Settings"
					onClick={_ => dispatch(setCurrentView('side-menu'))}
				>
					tune
				</button>
				<button
					className="header__menu-button list-builder material-icons"
					title="Toggle list builder column"
					onClick={toggleClaimColumnAndBlurButton}
				>
					list_alt
				</button>
				<div className="header__store-name">
					{storeName || 'Grocery List'}
				</div>
			</div>
		</BaseList>
	);
};

export default SheetStoreProductsList;
