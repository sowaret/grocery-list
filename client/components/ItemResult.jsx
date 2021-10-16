import React from 'react';
import { formatPrice } from '../js/functions';
import { calculatePerSize } from '../js/productUnitConversion';
import './styles/ItemResult';

const imageUrlBase = 'https://www.kroger.com/product/images/small/front/';

const ItemResult = ({ data, onClick }) => {
	const item = data;
	const { name, size } = item;
	const imageUrl = `${imageUrlBase}${item.upc}`;
	const { regular: price, promo: salePrice } = item.price;
	const activePrice = salePrice || price;
	const classes = [
		'ItemResult',
		...(price ? '' : ['noprice']),
		...(salePrice ? ['sale'] : ''),
	].join(' ');
	const perSize = calculatePerSize(size, price, activePrice);

	const priceDisplay = (
		<div className="itemResult-prices">
			<span className="itemResult-salePrice">{formatPrice(salePrice)}</span>
			<span className="itemResult-regularPrice">{formatPrice(price)}</span>
			<span className="itemResult-perSize">(${perSize})</span>
		</div>
	);

	return (
		<div className={classes} onClick={() => onClick(item)}>
			<div className="itemResult-size">{size}</div>
			<img className="itemResult-thumb" src={imageUrl} />

			<div className="itemResult-name" title={name}>
				{name}
			</div>

			{priceDisplay}
		</div>
	);
};

export default ItemResult;
