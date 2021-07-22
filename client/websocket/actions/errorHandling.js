import { setCurrentPOST } from '../../features/appSlice';
import { setDetailsError, setJoinError } from '../../features/sheetSlice';
import { setUserError } from '../../features/userSlice';

const culpritReducers = {
	JoinSheetModal: setJoinError,
	SheetDetailsModal: setDetailsError,
	UserModal: setUserError,
};

const otherReducers = {
	CULPRIT_ERROR: ({ dispatch, payload }) => {
		const { culprit, error } = payload;
		if (culprit in culpritReducers)
			dispatch(culpritReducers[culprit](error.message));
		dispatch(setCurrentPOST());
	},
};

module.exports = { otherErrorHandlingReducers: otherReducers };
