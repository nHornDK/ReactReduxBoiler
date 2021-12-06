/// <reference types="react-scripts" />

declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: 'development' | 'production' | 'test';
		PUBLIC_URL: string;
		REACT_APP_GOOGLE_AUTH_URL: string;
		REACT_APP_GOOGLE_AUTH_TOKEN_URL: string;
		REACT_APP_GOOGLE_AUTH_CLIENT_ID: string;
		REACT_APP_GOOGLE_AUTH_CLIENT_SECRET: string;
		REACT_APP_GOOGLE_AUTH_SCOPE: string;
		REACT_APP_FIRESTORE_DOCUMENTS_API_URL: string;
	}
}
