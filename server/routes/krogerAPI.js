const express = require('express');
const krogerAPIRouter = express.Router();
const { JsonError } = require('../utils/requests');
const krogerAPI = require('../krogerAPI');

const formatStoreResults = storeSearchResponse =>
	storeSearchResponse.data.map(store => {
		const { locationId, name, chain } = store;
		const { addressLine1, city, state, zipCode } = store.address;

		return {
			store_id: locationId,
			name,
			chain,
			address: addressLine1,
			city,
			state,
			zipCode,
		};
	});

const formatProductResults = productSearchResponse =>
	productSearchResponse.data.map(product => {
		// Handle missing product data
		const { brand, description, items, upc } = product;
		const { size } = items[0];

		const [_aisle, _price] = [product.aisleLocations, items[0].price];
		const aisle = _aisle.length
			? {
					description: _aisle[0].description,
					number: _aisle[0].number,
			  }
			: {};
		const price = _price
			? {
					regular: _price.regular,
					..._price.promo && { promo: _price.promo },
			  }
			: { regular: null };

		return {
			upc,
			name: description,
			brand,
			size,
			price,
			aisle,
		};
	});

const getErrorEnum = (err, findErrorName) => {
	const errorEnum = err.response.data.error === 'invalid_token'
		? 'KROGER_INVALID_TOKEN'
		: 'KROGER_FIND_' + findErrorName;
	return errorEnum;
};

krogerAPIRouter
	.get('/findStores/:zipCode', (req, res) => {
		krogerAPI.get(
			'/locations',
			{
				'filter.zipCode.near': req.params.zipCode,
				'filter.chain': 'KINGSOOPERS',
				'filter.limit': 5,
			},
			{
				success: response => res.json(formatStoreResults(response)),
				fail: err => JsonError(res, getErrorEnum(err, 'STORES')),
			}
		);
	})
	.get('/findProducts/:storeId', (req, res) => {
		krogerAPI.get(
			'/products',
			{
				'filter.locationId': req.params.storeId,
				'filter.term': req.query.term,
				'filter.start': req.query.skip || 1,
				'filter.limit': req.query.limit || 20,
			},
			{
				success: response => res.json(formatProductResults(response)),
				fail: err => JsonError(res, getErrorEnum(err, 'PRODUCTS')),
			}
		);
	});

module.exports = krogerAPIRouter;
