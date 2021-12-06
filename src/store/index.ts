import { AnyAction, applyMiddleware, CombinedState, compose, createStore, Store } from 'redux';
import thunk from 'redux-thunk';

import { StorageHandler } from '../infrastructure/utilities';
import createRootReducer from './RootReducer';
import RootState from './RootState';

const configureStore = (): Store<CombinedState<RootState>, AnyAction> => {
	const storageHandler = new StorageHandler<RootState | undefined>(undefined);
	const preloadedState = storageHandler.loadState();
	const rootReducer = createRootReducer();
	const middleware = applyMiddleware(thunk);

	const store = createStore(rootReducer, preloadedState, compose(middleware));
	store.subscribe(() => {
		storageHandler.saveState(store.getState());
	});
	return store;
};

export default configureStore();
