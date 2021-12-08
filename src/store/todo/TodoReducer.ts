import { TodoDocument } from '../../models/firestore';
import { ActionType } from '../StoreTypes';
import { TodoActions } from './TodoActions';
import TodoState, { TodoItem } from './TodoState';

export const defaultState: TodoState = {
	byId: {},
};

const getTodoModel = ({ name, fields }: TodoDocument): TodoItem => {
	const id = name.substr(name.lastIndexOf('/') + 1, name.length - name.lastIndexOf('/'));
	return {
		id,
		name,
		title: fields.title.stringValue,
		note: fields.note.stringValue,
	};
};

const TodoReducer = (state: TodoState = defaultState, action: TodoActions): TodoState => {
	switch (action.type) {
		case ActionType.TODO_LIST_SUCCESS:
			const {
				payload: {
					data: { documents },
				},
			} = action;
			let { byId } = state;
			documents.forEach((doc) => {
				const item = getTodoModel(doc);
				byId = {
					...byId,
					[item.id]: item,
				};
			});
			return {
				...state,
				byId,
			};

		case ActionType.TODO_UPDATE_SUCCESS:
		case ActionType.TODO_CREATE_SUCCESS:
			const {
				payload: { data },
			} = action;
			const item = getTodoModel(data);
			return {
				...state,
				byId: {
					...state.byId,
					[item.id]: item,
				},
			};
		default:
			return state;
	}
};

export default TodoReducer;
