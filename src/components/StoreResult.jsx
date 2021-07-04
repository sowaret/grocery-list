import React from 'react';
import './styles/StoreResult';

const StoreResult = ({ data, onClick }) => {
	const store = data;
	const { name, address, city, state, zipCode } = store;

	return (
		<div
			className = "StoreResult"
			onClick = {_ => onClick(store)}
			>

			<div className="storeResult-name">{name}</div>
			<div className="storeResult-address">{address}</div>
			<div className="storeResult-city">{city}, {state} {zipCode}</div>

		</div>
	);
};

export default StoreResult;