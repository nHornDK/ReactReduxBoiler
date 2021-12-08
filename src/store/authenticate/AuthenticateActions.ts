import Container from '@fluffy-spoon/inverse';

import { GoogleAuthenticationService } from '../../infrastructure/services';
import { OpenIDToken } from '../../models/openId';
import { ActionType, AppThunk, PayloadAction } from '../StoreTypes';

export type AuthenticateAction = PayloadAction<OpenIDToken, ActionType.AUTHENTICATION_SUCCESS>;
export type AuthenticateFailedAction = PayloadAction<unknown, ActionType.AUTHENTICATION_FAILED>;
export type AuthenticateActions = AuthenticateAction | AuthenticateFailedAction;

export default class AuthenticateDispatchers {
	private authenticationService: GoogleAuthenticationService;

	constructor() {
		const container = new Container();
		this.authenticationService = container.resolveInstance(GoogleAuthenticationService);
	}

	public authenticate =
		(code: string): AppThunk<Promise<AuthenticateAction | AuthenticateFailedAction>> =>
		async (dispatch): Promise<AuthenticateAction | AuthenticateFailedAction> => {
			try {
				const response = await this.authenticationService.authenticate(code);
				return dispatch({
					type: ActionType.AUTHENTICATION_SUCCESS,
					payload: {
						data: response,
					},
				});
			} catch (error: unknown) {
				return dispatch({
					type: ActionType.AUTHENTICATION_FAILED,
					payload: {
						data: error,
					},
				});
			}
		};
}
