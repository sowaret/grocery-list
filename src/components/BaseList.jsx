import React from 'react';
import './styles/List';

const BaseList = ({ className, itemsDisplay, children }) => {
	const classes = [
		'BaseList',
		...className ? [className] : [],
	].join(' ');

	return (
		<div className={classes}>

			{children}
			{itemsDisplay}

		</div>
	);
};

export default BaseList;
