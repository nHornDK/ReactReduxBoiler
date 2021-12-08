import { TodoDocument } from '../../models/firestore';
import { ActionType } from '../StoreTypes';
import { TodoActions } from './TodoActions';
import TodoState, { TodoItem } from './TodoState';

export const defaultState: TodoState = {
	byId: {},
	allIds: [],
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
				allIds: [...Object.keys(byId)],
			};

		case ActionType.TODO_UPDATE_SUCCESS:
		case ActionType.TODO_CREATE_SUCCESS:
			const {
				payload: { data },
			} = action;
			const item = getTodoModel(data);
			const newstate = {
				...state,
				byId: {
					...state.byId,
					[item.id]: item,
				},
			};
			return {
				...newstate,
				allIds: [...Object.keys(newstate.byId)],
			};
		case ActionType.TODO_DELETE_SUCCESS:
			const {
				payload: { data: id },
			} = action;

			let byIdentifier = {};
			Object.keys(state.byId).forEach((idKey) => {
				if (idKey !== id)
					byIdentifier = {
						...byIdentifier,
						[idKey]: state.byId[idKey],
					};
			});

			return {
				...state,
				byId: { ...byIdentifier },
				allIds: [...Object.keys(byIdentifier)],
			};
		default:
			return state;
	}
};

export default TodoReducer;
