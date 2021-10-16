import React from 'react';
import { useDispatch } from 'react-redux';
import { wsUpdateItemChecked } from '../../webSocketModule';
import './styles/ChecklistItem';

const ChecklistItem = ({ aisle, checked, itemId, listId, name, price }) => {
	const dispatch = useDispatch();

	const classes = ['checklist-item', ...(checked ? ['checked'] : '')].join(' ');

	const checkboxText = checked ? 'check' : '';

	const toggleChecked = () =>
		dispatch(
			wsUpdateItemChecked({
				checked: !checked,
				itemId,
				listId,
			})
		);

	return (
		<div className={classes}>
			<div
				className="checklist-item__checkbox material-icons"
				onClick={toggleChecked}
			>
				{checkboxText}
			</div>
			<div className="checklist-item__name">{name}</div>
			<div className="checklist-item__price">${price?.toFixed(2)}</div>
			<div className="checklist-item__aisle">{aisle}</div>
		</div>
	);
};

export default ChecklistItem;
