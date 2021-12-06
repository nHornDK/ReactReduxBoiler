import { AnyAction, CombinedState, combineReducers, Reducer } from 'redux';

import RootState from './RootState';
import authenticateReducer from './authenticate/AuthenticateReducer';
import TodoReducer from './todo/TodoReducer';

const createRootReducer = (): Reducer<CombinedState<RootState>, AnyAction> =>
	combineReducers<RootState>({
		authenticate: authenticateReducer,
		todo: TodoReducer,
	});
export default createRootReducer;
