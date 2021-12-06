import Container, { Injectable } from '@fluffy-spoon/inverse';
import { HttpClient, SimpleHttpClient } from '../utilities';
import OpenIdToken from '../../models/openId/OpenIdToken';

const {
	REACT_APP_GOOGLE_AUTH_URL: authUrl,
	REACT_APP_GOOGLE_AUTH_TOKEN_URL: authTokenUrl,
	REACT_APP_GOOGLE_AUTH_CLIENT_ID: authClientId,
	REACT_APP_GOOGLE_AUTH_CLIENT_SECRET: authClientSecret,
	REACT_APP_GOOGLE_AUTH_SCOPE: authScope,
	REACT_APP_GOOGLE_AUTH_REDIRECT_URI: redirectUri,
} = process.env;

@Injectable
class GoogleAuthenticationService {
	private httpClient: HttpClient;

	constructor() {
		const container = new Container();
		this.httpClient = container.resolveInstance(SimpleHttpClient);
	}

	public static getAuthenticationUrl = (): string => encodeURI(`${authUrl}?client_id=${authClientId}&response_type=code&scope=${authScope}&redirect_uri=${redirectUri}`);

	authenticate = async (code: string): Promise<OpenIdToken> => {
		const requestData = `code=${code}&client_id=${authClientId}&client_secret=${authClientSecret}&redirect_uri=${redirectUri}&grant_type=authorization_code`;
		return this.httpClient.post<string, OpenIdToken>(authTokenUrl, requestData, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		});
	};

	authenticateWindow = async (): Promise<OpenIdToken | undefined> => {
		const {
			location: { search },
		} = window;
		const urlParams = new URLSearchParams(search);
		const code = urlParams.get('code');
		if (code) {
			return this.authenticate(code);
		}
		return undefined;
	};
}
export default GoogleAuthenticationService;
