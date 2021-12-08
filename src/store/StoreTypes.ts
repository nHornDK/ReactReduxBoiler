import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import RootState from './RootState';

export interface PayloadAction<TPayLoad, TActionType = ActionType> extends Action<TActionType> {
	payload: {
		data: TPayLoad;
	};
}
export type AppDispatch = ThunkDispatch<RootState, unknown, Action<ActionType>>;

export type AppThunk<TReturnType = void> = ThunkAction<TReturnType, RootState, unknown, Action<ActionType>>;

export enum ActionType {
	AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED',
	AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS',
	TODO_LIST_SUCCESS = 'TODO_LIST_SUCCESS',
	TODO_FAILED = 'TODO_FAILED',
	TODO_CREATE_SUCCESS = 'TODO_CREATE_SUCCESS',
	TODO_UPDATE_SUCCESS = 'TODO_UPDATE_SUCCESS',
	TODO_DELETE_SUCCESS = 'TODO_DELETE_SUCCESS',
}
