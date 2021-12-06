import Container, { Injectable } from '@fluffy-spoon/inverse';
import GoogleFirestoreDocumentService from './GoogleFirestoreDocumentService';
import { TodoDocument } from '../../models/firestore/TodoDocument';
import { FirestoreDocuments } from '../../models/firestore/FirestoreDocument';
import OpenIdToken from '../../models/openId/OpenIdToken';

// const firststoreGevirNotesUri = 'https://firestore.googleapis.com/v1/projects/gevirrclone/databases/(default)/documents/GevirNotes/';

@Injectable
class TodoService {
	private documentService: GoogleFirestoreDocumentService;

	constructor() {
		const container = new Container();
		this.documentService = container.resolveInstance(GoogleFirestoreDocumentService);
	}

	getTodoDocuments = async (openIdToken: OpenIdToken): Promise<FirestoreDocuments<TodoDocument> | undefined> => {
		const tokenResponse = await this.documentService.listDocuments<TodoDocument>('GevirNotes', openIdToken);
		return tokenResponse;
		// try {
		//     if(tokenResponse){
		//         const token = tokenResponse.access_token;
		//         return this.httpClient.get<FirestoreDocuments<GevirNoteDocument>>(`${firststoreGevirNotesUri}?access_token=${token}`);
		//     }
		// } catch (error: unknown) {
		//     console.error(error);
		// }
		// return undefined;
	};
}
export default TodoService;
