import { OpenIDToken } from '../../models/openId';

export default interface AuthenticateState {
	token?: OpenIDToken;
	status: 'IDLE' | 'AUTHENTICATING' | 'FAILED';
	errorMessage?: unknown;
}
