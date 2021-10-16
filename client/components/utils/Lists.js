import React from 'react';
import { formatPrice } from '../../js/functions';
import ListItem from '../ListItem';

// General
export const getProductGridRowNames = ({ storeProductIdList, items }) => {
	const idList =
		storeProductIdList || // List
		(items // SheetStoreProductsList
			? Object.keys(items)
			: []);
	const namedRows = idList.map(x => `'spid-${x}'`);

	return {
		gridTemplateAreas: namedRows.join(' '),
		gridTemplateRows: `repeat(${namedRows.length}, 30px)`,
	};
};
// end general

// List component
export const getItemElementsFromStoreProductIds = data => {
	const { id, items, kv_spId_itemId, storeProductIdList } = data;
	const keys_spId = Object.keys(kv_spId_itemId);

	return storeProductIdList.map(storeProductId => {
		if (!keys_spId.includes(storeProductId))
			return <div className="list-item" key={storeProductId} />;

		const listItemId = kv_spId_itemId[storeProductId];
		return (
			<ListItem
				data={items[listItemId]}
				id={listItemId}
				listId={id}
				key={storeProductId}
			/>
		);
	});
};

export const getListItemsDisplay = ({
	id,
	items,
	storeProductIdList,
	total,
}) => {
	const kv_spId_itemId = mapStoreProductsToListItems(items);
	const itemElements = getItemElementsFromStoreProductIds({
		id,
		items,
		kv_spId_itemId,
		storeProductIdList,
	});

	const attributes = {
		className: 'list-items',
		style: getProductGridRowNames({ storeProductIdList }),
		key: 'item',
	};
	const itemList = React.createElement('div', attributes, itemElements);
	return (
		<>
			{itemList}
			<div className="list-item list-item--total" key="total">
				{formatPrice(total, true, true)}
			</div>
		</>
	);
};

export const getTotalCost = ({ list, storeProducts }) => {
	const total = Object.values(list.items).reduce((total, item) => {
		const cost = item.salePrice || storeProducts[item.storeProductId].price;
		return cost ? total + cost * item.quantity : total;
	}, 0);
	return Math.round(total * 100) / 100;
};

export const mapStoreProductsToListItems = items => {
	// We're iterating through storeProduct IDs, so we need to store any item in this list that corresponds to each of those
	// { storeProductId: listItemid }
	const kv_spId_itemId = {};
	Object.keys(items).map(listItemId => {
		kv_spId_itemId[items[listItemId].storeProductId] = listItemId;
	});

	return kv_spId_itemId;
};
// end list component
