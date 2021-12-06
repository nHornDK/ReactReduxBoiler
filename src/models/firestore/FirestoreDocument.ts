/* eslint-disable camelcase */
export interface FirestoreDocument<TFields> {
	createTime: string;
	fields: TFields;
	name: string;
	updateTime: string;
}
export interface FirestoreDocuments<TDocument> {
	documents: TDocument[];
}
