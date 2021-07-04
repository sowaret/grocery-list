import { capitalize, lowercase } from '../js/functions';
import { otherErrorHandlingReducers } from './actions/errorHandling';
import { sheetActions, otherSheetReducers } from './actions/sheet';
import { userActions, otherUserReducers } from './actions/user';

const actionReducers = {
	...require('./actions/list'),
	...require('./actions/listItem'),
	...sheetActions,
	...require('./actions/store'),
	...userActions,
	...require('./actions/webSocket'),
};
const actionEnumList = Object.keys(actionReducers);

const getActionFunctionNameFromEnum = actionEnum => {
	const parts = capitalize(lowercase(actionEnum.split('_')));
	return ['ws', ...parts].join('');
};

const otherReducers = {
	...otherErrorHandlingReducers,
	...otherSheetReducers,
	...otherUserReducers,
};

export {
	actionReducers,
	actionEnumList,
	getActionFunctionNameFromEnum,
	otherReducers,
};
