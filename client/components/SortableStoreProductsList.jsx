import React from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import SheetStoreProductsListItem from './SheetStoreProductsListItem';

const SortableStoreProductItem = SortableElement( ({ props }) =>
	React.createElement(SheetStoreProductsListItem, props));

const SortableStoreProductsList = SortableContainer( ({ style, items }) => {
	const sortableItemElements = Object.keys(items).map((id, i) => {
		const props = {
			index: i,
			id: id,
			data: items[id],
		};

		return <SortableStoreProductItem index={i} key={i} props={props} />;
	});

	const attributes = { className: 'list-items', style };
	return React.createElement('div', attributes, sortableItemElements);
});

export default SortableStoreProductsList;
