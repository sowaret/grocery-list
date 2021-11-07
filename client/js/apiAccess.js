import axios from 'axios';

const API_URL = `${location.protocol}//${location.hostname}:${process.env.API_PORT}/api/v1`;

const populateEmptyCallbacks = callbacks => {
	callbacks = {
		success: callbacks.success || (() => {}),
		fail: callbacks.fail || (() => {}),
	};
};

const parseError = err =>
	err.response
		? err.response.data
		: { messages: [err.request ? err.message : 'No response from server'] };

const API = {
	get: (route, callbacks) => {
		populateEmptyCallbacks(callbacks);
		return axios.get(`${API_URL}${route}`).then(
			res => callbacks.success(res.data),
			err => callbacks.fail(parseError(err))
		);
	},
	post: (route, data, callbacks) => {
		populateEmptyCallbacks(callbacks);
		return axios.post(`${API_URL}${route}`, data).then(
			res => callbacks.success(res.data),
			err => callbacks.fail(parseError(err))
		);
	},
	put: (route, data, callbacks) => {
		populateEmptyCallbacks(callbacks);
		return axios.put(`${API_URL}${route}`, data).then(
			res => callbacks.success(res.data),
			err => callbacks.fail(parseError(err))
		);
	},
	patch: (route, update_data, callbacks) => {
		populateEmptyCallbacks(callbacks);
		return axios.patch(`${API_URL}${route}`, update_data).then(
			res => callbacks.success(res.data),
			err => callbacks.fail(parseError(err))
		);
	},
};

module.exports = API;
