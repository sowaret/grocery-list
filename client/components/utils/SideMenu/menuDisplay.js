import React from 'react';
import { joinClasses } from './joinClasses';

const changePasswordItem = { icon: 'password', text: 'Change password' };
const getMenuItems = ({ functions: f, params: p }) => ({
	Users: { hide: !Object.keys(p.users).length, items: p.users },
	Sheet: {
		hide: !p.sheetCode,
		label: { classes: 'sheet-code', value: `Code: ${p.sheetCode}` },
		items: [
			{
				...changePasswordItem,
				onClick: () =>
					f.closeMenuAndDispatch(f.setCurrentView('sheet-details-password')),
			},
		],
	},
});

const getLabelDisplay = label => {
	if (!label) return;
	const { classes, value } = label;
	const className = joinClasses('menu__section-label', [classes, classes]);
	return React.createElement('span', { className }, value);
};

const getIconDisplay = icon =>
	icon &&
	React.createElement(
		'span',
		{ className: 'menu__item__icon material-icons' },
		icon
	);

const getUsersDisplay = users =>
	React.createElement(
		'div',
		{ className: 'menu__user-list' },
		Object.values(users).map((user, key) => {
			const usernameFirstLetter = user.username.slice(0, 1).toUpperCase();
			const className = joinClasses('menu__user', [
				user.isDisconnected,
				'disconnected',
			]);
			const style = { backgroundColor: user.customColour };
			return React.createElement(
				'div',
				{ className, key, style },
				usernameFirstLetter
			);
		})
	);

const getItemsDisplay = (items, header) =>
	header === 'Users'
		? getUsersDisplay(items)
		: items.map((item, i) => {
				const { classes, icon, onClick, text } = item;
				const className = joinClasses('menu__item', classes);
				const iconDisplay = getIconDisplay(icon);
				if (header === 'Users') return;
				return React.createElement(
					'button',
					{ className, onClick, key: i },
					<>
						{iconDisplay}
						{text}
					</>
				);
		  });

export const getMenuDisplay = ({ functions, params }) =>
	Object.entries(getMenuItems({ functions, params })).map(
		([header, { hide, items, label }], i) =>
			!hide && (
				<div key={i}>
					<h2>
						{header}
						{getLabelDisplay(label)}
					</h2>
					{getItemsDisplay(items, header)}
				</div>
			)
	);
