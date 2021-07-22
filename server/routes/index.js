const express = require('express');
const { err } = require('../enums');
const krogerAPIRouter = require('./krogerAPI');

const mainRouter = express.Router();
mainRouter.use('/', krogerAPIRouter);

// Return 404 for any other routes
mainRouter.get('*', (req, res) =>
	res.status(err.INVALID_ROUTE.status).json({
		code: err.INVALID_ROUTE.code,
		messages: [`Invalid route: ${req.path}`],
	})
);

module.exports = mainRouter;
