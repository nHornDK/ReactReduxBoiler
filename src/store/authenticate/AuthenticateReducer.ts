import { ActionTypeEnum } from '../StoreTypes';
import { AuthenticateActions, AuthenticateAction, AuthenticateFailedAction } from './AuthenticateActions';
import AuthenticateState from './AuthenticateState';

export const defaultState: AuthenticateState = {
	token: undefined,
	status: 'IDLE',
	errorMessage: '',
};

const AuthenticateReducer = (state: AuthenticateState = defaultState, action: AuthenticateActions): AuthenticateState => {
	switch (action.type) {
		case ActionTypeEnum.AUTHENTICATION_SUCCESS:
			return (({ payload: { data } }: AuthenticateAction): AuthenticateState => ({
				...state,
				token: {
					...state.token,
					...data,
				},
				status: 'IDLE',
			}))(action as AuthenticateAction);
		case ActionTypeEnum.AUTHENTICATION_FAILED:
			return (({ payload: { data } }: AuthenticateFailedAction): AuthenticateState => ({
				...state,
				errorMessage: data,
				status: 'FAILED',
			}))(action as AuthenticateFailedAction);
		default:
			return state;
	}
};

export default AuthenticateReducer;
