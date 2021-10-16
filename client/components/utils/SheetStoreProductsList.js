import { setIsSorting, reorderStoreProducts } from '../../features/sheetSlice';
import { wsReorderStoreProducts } from '../../webSocketModule';

export default updateStoreProductListSort = data => {
	const { dispatch, storeProducts, oldIndex, newIndex } = data;
	dispatch(setIsSorting(false));

	// Do nothing if item was not moved
	if (oldIndex === newIndex) return;

	dispatch(
		wsReorderStoreProducts({
			newIndex,
			oldIndex,
			storeProductId: Object.keys(storeProducts)[oldIndex],
		})
	);
};
