import Container, { Injectable } from '@fluffy-spoon/inverse';
import { HttpClient, SimpleHttpClient } from '../utilities';
// import {GevirNoteDocument} from '../../models/firestore/GevirNoteDocument'
import { FirestoreDocuments } from '../../models/firestore/FirestoreDocument';
// import { GoogleAuthenticationService } from '.';
import OpenIdToken from '../../models/openId/OpenIdToken';

// const firststoreGevirNotesUri = 'https://firestore.googleapis.com/v1/projects/gevirrclone/databases/(default)/documents/GevirNotes/';

const { REACT_APP_FIRESTORE_DOCUMENTS_API_URL: documentsUrl } = process.env;

@Injectable
class GoogleFirestoreDocumentService {
	private httpClient: HttpClient;

	constructor() {
		const container = new Container();
		this.httpClient = container.resolveInstance(SimpleHttpClient);
	}

	listDocuments = async <TDocument>(collectionId: string, openIdToken: OpenIdToken): Promise<FirestoreDocuments<TDocument>> => {
		const { access_token: accessToken } = openIdToken;
		return this.httpClient.get<FirestoreDocuments<TDocument>>(`${documentsUrl}${collectionId}?access_token=${accessToken}`);
	};

	createDocument = async <TDocumentFields, TDocument>(collectionId: string, document: TDocumentFields, openIdToken: OpenIdToken): Promise<TDocument> => {
		const { access_token: accessToken } = openIdToken;
		return this.httpClient.post<TDocumentFields, TDocument>(`${documentsUrl}${collectionId}?access_token=${accessToken}`, document);
	};
}
export default GoogleFirestoreDocumentService;