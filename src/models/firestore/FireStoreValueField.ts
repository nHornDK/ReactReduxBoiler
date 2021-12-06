enum ValueFieldKey {
	NULL = 'nullValue',
	BOOLEAN = 'booleanValue',
	INTEGER = 'integerValue',
	DOUBLE = 'doubleValue',
	TIMESTAMP = 'timestampValue',
	STRING = 'stringValue',
	BYTES = 'bytesValue',
	REFERENCE = 'referenceValue',
	GEOPOINT = 'geoPointValue',
	ARRAY = 'arrayValue',
	MAP = 'mapValue',
}

type ValueField<TKey extends keyof typeof ValueFieldKey, TValue> = {
	[key in typeof ValueFieldKey[TKey]]: TValue;
};

export type FirestoreDocumentIntegerValueField = ValueField<'INTEGER', number>;
export type FirestoreDocumentStringValueField = ValueField<'STRING', string>;
