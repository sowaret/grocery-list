import {
	actionReducers,
	actionEnumList,
	getActionFunctionNameFromEnum,
	otherReducers,
} from './websocket/actions';

// BUILD ACTIONS
const actions = {};
for (const [actionEnum, { parameters }] of Object.entries(actionReducers)) {
	const functionName = getActionFunctionNameFromEnum(actionEnum);
	actions[functionName] = params => {
		const type = { type: actionEnum };
		// Omit parameters for actions that take none (e.g. createSheet)
		if (!parameters) return type;
		// Handle single parameters, e.g. connect(URL), createList(name)
		if (typeof parameters === 'string')
			return { [parameters]: params, ...type };

		// Filter parameters by the ones that the reducer uses
		const filteredParams = Object.fromEntries(
			Object.entries(params).filter(x => parameters.includes(x[0]))
		);
		return { ...filteredParams, ...type };
	};
}

// BUILD REDUCERS - websocket onMessage callbacks
const responseReducers = {};
for (const [action, { reducer, reducerName }] of Object.entries(actionReducers))
	responseReducers[reducerName] = reducer;

for (const [reducerName, reducer] of Object.entries(otherReducers))
	responseReducers[reducerName] = reducer;

module.exports = { ...actions, actions, actionEnumList, responseReducers };
