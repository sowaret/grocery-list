export default {
	appendList: (state, action) => {
		state.lists = {
			...state.lists,
			...action.payload,
		};
	},
	renameList: (state, action) => {
		const { listId, newName } = action.payload;
		state.lists[listId].name = newName;
	},
	setChecklistListId: (state, action) => {
		state.checklistListId = action.payload || null;
	},
	setIsSorting: (state, action) => {
		state.isSorting = action.payload;
	},
	setLists: (state, action) => {
		state.lists = action.payload || {};
	},
	setNewItemListId: (state, action) => {
		state.newItemListId = action.payload;
	},
};
