import { OpenIDToken } from '../../models/openId';

export default interface TodoState {
	items: TodoItem[];
}
export interface TodoItem {
	name: string;
	title: string;
	note: string;
}
