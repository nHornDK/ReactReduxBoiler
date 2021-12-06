/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Container from '@fluffy-spoon/inverse';

import { GoogleAuthenticationService } from '../../infrastructure/services';
import { OpenIDToken } from '../../models/openId';
import { ActionTypeEnum, AppThunk, PayloadAction } from '../StoreTypes';

export type AuthenticateAction = PayloadAction<OpenIDToken>;
export type AuthenticateFailedAction = PayloadAction<unknown>;
export type AuthenticateActions = AuthenticateAction | AuthenticateFailedAction;

export default class AuthenticateDispatchers {
	private authenticationService: GoogleAuthenticationService;

	constructor() {
		const container = new Container();
		this.authenticationService = container.resolveInstance(GoogleAuthenticationService);
	}

	public authenticateAsync =
		(code: string): AppThunk<Promise<AuthenticateAction | AuthenticateFailedAction>> =>
		async (dispatch) => {
			try {
				const response = await this.authenticationService.authenticate(code);
				return dispatch({
					type: ActionTypeEnum.AUTHENTICATION_SUCCESS,
					payload: {
						data: response,
					},
				});
			} catch (error: unknown) {
				return dispatch({
					type: ActionTypeEnum.AUTHENTICATION_FAILED,
					payload: {
						data: error,
					},
				});
			}
		};
}
