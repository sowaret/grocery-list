import itemReducers from './item';
import listReducers from './list';
import otherReducers from './other';
import storeProductsListReducers from './storeProductsList';
import userReducers from './user';

export default {
	...itemReducers,
	...listReducers,
	...otherReducers,
	...storeProductsListReducers,
	...userReducers,
};
