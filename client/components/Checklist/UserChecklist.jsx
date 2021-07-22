import React from 'react';
import ChecklistItem from './ChecklistItem';
import './styles/UserChecklist';

const UserChecklist = ({ user, items }) => {
	const title = user?.username || 'Unclaimed items';
	const itemsDisplay = items.filter(x => !x.checked).map(
		(item, key) => React.createElement(ChecklistItem, { ...item, key })
	);
	const checkedItemsDisplay = items.filter(x => x.checked).map(
		(item, key) => React.createElement(ChecklistItem, { ...item, key })
	);

	return (
		<div className="user-checklist">
			<header>{title}</header>
			{itemsDisplay}
			{checkedItemsDisplay}
		</div>
	);
};

export default UserChecklist;
