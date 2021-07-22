import axios from 'axios';

const { API_URL } = require('./config'),

	populateEmptyCallbacks = callbacks => {
		callbacks = {
			success: callbacks.success ? callbacks.success : _ => {},
			fail: callbacks.fail ? callbacks.fail : _ => {},
		};
	},

	parseError = err => {
		const data = {};

		// Server responded
		if (err.response)
			return err.response.data;
		// No response
		else if (err.request)
			data.messages = ['No response from server'];
		// Request error
		else
			data.messages = [error.message];

		return data;
	},

	API =
	{
		get: (route, callbacks) => {
			populateEmptyCallbacks(callbacks);

			return axios.get(`${API_URL}${route}`)
				.then(
					res => callbacks.success(res.data),
					err => callbacks.fail( parseError(err) ),
				);
		},

		post: (route, data, callbacks) => {
			populateEmptyCallbacks(callbacks);

			return axios.post(`${API_URL}${route}`, data)
				.then(
					res => callbacks.success(res.data),
					err => callbacks.fail( parseError(err) ),
				);
		},

		put: (route, data, callbacks) => {
			populateEmptyCallbacks(callbacks);

			return axios.put(`${API_URL}${route}`, data)
				.then(
					res => callbacks.success(res.data),
					err => callbacks.fail( parseError(err) ),
				);
		},

		patch: (route, update_data, callbacks) => {
			populateEmptyCallbacks(callbacks);

			return axios.patch(`${API_URL}${route}`, update_data)
				.then(
					res => callbacks.success(res.data),
					err => callbacks.fail( parseError(err) ),
				);
		},
	};

module.exports = API;
