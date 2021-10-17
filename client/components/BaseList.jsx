import React from 'react';
import useClasses from '../hooks/useClasses';
import './styles/List';

const BaseList = ({ className, itemsDisplay, children }) => (
	<div className={useClasses('BaseList', className)}>
		{children}
		{itemsDisplay}
	</div>
);

export default BaseList;
