import { ActionType } from '../StoreTypes';
import { AuthenticateActions } from './AuthenticateActions';
import AuthenticateState from './AuthenticateState';

export const defaultState: AuthenticateState = {
	token: undefined,
	status: 'IDLE',
	errorMessage: '',
};

const AuthenticateReducer = (state: AuthenticateState = defaultState, action: AuthenticateActions): AuthenticateState => {
	switch (action.type) {
		case ActionType.AUTHENTICATION_SUCCESS:
			const {
				payload: { data },
			} = action;
			return {
				...state,
				token: {
					...state.token,
					...data,
				},
				status: 'IDLE',
			};
		case ActionType.AUTHENTICATION_FAILED:
			const {
				payload: { data: errorMessage },
			} = action;
			return {
				...state,
				errorMessage,
				status: 'FAILED',
			};
		default:
			return state;
	}
};

export default AuthenticateReducer;
