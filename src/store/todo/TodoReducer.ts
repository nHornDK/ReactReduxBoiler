import { ActionTypeEnum } from '../StoreTypes';
import { TodoActions, TodoAction, TodoCreateAction } from './TodoActions';
import TodoState from './TodoState';

export const defaultState: TodoState = {
	items: [],
};

const TodoReducer = (state: TodoState = defaultState, action: TodoActions): TodoState => {
	console.log(action);
	switch (action.type) {
		case ActionTypeEnum.TODO_LIST_SUCCESS:
			console.log({ action, state });
			return (({ payload: { data } }: TodoAction): TodoState => ({
				...state,
				items: [
					...data.documents.map((doc) => {
						console.log('map', { doc });
						return {
							name: doc.name,
							title: doc.fields.title.stringValue,
							note: doc.fields.note.stringValue,
						};
					}),
				],
			}))(action as TodoAction);
		case ActionTypeEnum.TODO_CREATE_SUCCESS:
			console.log({ action, state });
			return (({ payload: { data } }: TodoCreateAction): TodoState => ({
				...state,
				items: [
					...state.items,
					{
						name: data.name,
						title: data.fields.title.stringValue,
						note: data.fields.note.stringValue,
					},
				],
			}))(action as TodoCreateAction);
		default:
			return state;
	}
};

export default TodoReducer;
