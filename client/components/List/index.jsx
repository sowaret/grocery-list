import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import BaseList from '../BaseList';
import ListButtons from './Buttons';
import ListName from './Name';
import { getListItemsDisplay, getTotalCost } from '../utils/Lists';

const List = ({ id }) => {
	// Redux
	const list = useSelector(state => state.sheet.lists[id]);
	const { items, name } = list;
	const { claimColumnListId, newItemListId, storeProducts } = useSelector(
		state => state.sheet
	);
	// State
	const [isHover, setIsHover] = useState(false);
	const [storeProductIdList, setStoreProductIdList] = useState([]);
	const [total, setTotal] = useState(0);

	const classes = [
		'List',
		...(claimColumnListId === id ? ['claim-column-selected'] : ''),
	].join(' ');

	const baseElementRef = useRef();

	const handleMouseEnter = () => setIsHover(true);
	const handleMouseLeave = () => setIsHover(false);

	const listNameHeaderPortal = ReactDOM.createPortal(
		<ListName listId={id} name={name} />,
		document.querySelector('.list-header')
	);

	const listButtonsPortal = ReactDOM.createPortal(
		React.createElement(ListButtons, {
			claimColumnListId,
			isHover,
			listId: id,
			newItemListId,
		}),
		document.querySelector('.list-footer')
	);

	// On mount
	useEffect(() => {
		const baseElement = baseElementRef.current;
		baseElement.addEventListener('mouseenter', handleMouseEnter);
		baseElement.addEventListener('mouseleave', handleMouseLeave);

		return (cleanup = () => {
			baseElement.removeEventListener('mouseenter', handleMouseEnter);
			baseElement.removeEventListener('mouseleave', handleMouseLeave);
		});
	}, []);

	// Update total when items change
	useEffect(() => {
		setTotal(getTotalCost({ list, storeProducts }));
	}, [items]);

	useEffect(() => {
		setStoreProductIdList(Object.keys(storeProducts));
	}, [storeProducts]);

	return (
		<div className="list__container" ref={baseElementRef}>
			<BaseList
				className={classes}
				itemsDisplay={getListItemsDisplay({
					id,
					items,
					storeProductIdList,
					total,
				})}
			>
				{listNameHeaderPortal}
				{listButtonsPortal}
			</BaseList>
		</div>
	);
};

export default List;
