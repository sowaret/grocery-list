import React from 'react';
import useClasses from '../hooks/useClasses';
import './styles/ListItems';

const ListItemBase = ({
	className,
	baseElementRef,
	gridAreaId,
	priceDisplay,
	children,
}) => {
	const classes = useClasses('list-item', className);
	const gridAreaStyle = { gridArea: `spid-${gridAreaId}` };

	return (
		<div className={classes} style={gridAreaStyle} ref={baseElementRef}>
			{children}
			<div className="list-item__prices">{priceDisplay}</div>
		</div>
	);
};

export default ListItemBase;
