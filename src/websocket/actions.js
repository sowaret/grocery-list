import { otherErrorHandlingReducers } from './actions/errorHandling';
import { sheetActions, otherSheetReducers } from './actions/sheet';
import { userActions, otherUserReducers } from './actions/user';

const definitions = {
	...require('./actions/list'),
	...require('./actions/listItem'),
	...sheetActions,
	...require('./actions/store'),
	...userActions,
};

const otherReducers = {
	...otherErrorHandlingReducers,
	...otherSheetReducers,
	...otherUserReducers,
};

export { definitions, otherReducers };
