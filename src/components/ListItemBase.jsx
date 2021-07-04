import React from 'react';
import './styles/ListItems';

const ListItemBase = params => {
	const { className, baseElementRef,
		gridAreaId, priceDisplay, children } = params;

	const classes = [
			'list-item',
			...className ? [className] : '',
		].join(' '),
		gridAreaStyle = { gridArea: `spid-${gridAreaId}` };

	return (
		<div className={classes} style={gridAreaStyle} ref={baseElementRef}>

			{children}

			<div className="list-item__prices">
				{priceDisplay}
			</div>

		</div>
	);
};

export default ListItemBase;
