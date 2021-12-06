import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import RootState from './RootState';

export interface PayloadAction<TPayLoad> extends Action<ActionTypeEnum> {
	payload: {
		data: TPayLoad;
	};
}
export type AppDispatch = ThunkDispatch<RootState, unknown, Action<ActionTypeEnum>>;

export type AppThunk<TReturnType = void> = ThunkAction<TReturnType, RootState, unknown, Action<ActionTypeEnum>>;

export enum ActionTypeEnum {
	AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED',
	AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS',
	TODO_LIST_SUCCESS = 'TODO_LIST_SUCCESS',
	TODO_LIST_FAILED = 'TODO_LIST_FAILED',
	TODO_CREATE_SUCCESS = 'TODO_CREATE_SUCCESS',
	TODO_CREATE_FAILED = 'TODO_CREATE_FAILED',
}
