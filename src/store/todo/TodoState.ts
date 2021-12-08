export default interface TodoState {
	byId: NormalizedData<TodoItem>;
	allIds: string[];
}
export type NormalizedData<TValue> = {
	[key: string]: TValue;
};
export interface TodoItem {
	id: string;
	name: string;
	title: string;
	note: string;
}
