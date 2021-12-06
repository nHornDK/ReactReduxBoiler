import { FirestoreDocumentStringValueField } from './FireStoreValueField';
import { FirestoreDocument } from './FirestoreDocument';

export type TodoDocument = FirestoreDocument<TodoDocumentFields>;

export interface TodoDocumentFields {
	title: FirestoreDocumentStringValueField;
	note: FirestoreDocumentStringValueField;
}
