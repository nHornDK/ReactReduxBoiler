import { FirestoreDocumentStringValueField } from './FireStoreValueField';
import { FirestoreDocument } from './FirestoreDocument';

export type GevirNoteDocument = FirestoreDocument<GevirNoteDocumentFields>;

export interface GevirNoteDocumentFields {
	Note: FirestoreDocumentStringValueField;
	Title: FirestoreDocumentStringValueField;
}
