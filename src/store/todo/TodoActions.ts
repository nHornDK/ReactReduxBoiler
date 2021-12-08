import Container from '@fluffy-spoon/inverse';

import { GoogleFirestoreDocumentService } from '../../infrastructure/services';
import { TodoDocument } from '../../models/firestore';
import { FirestoreDocuments } from '../../models/firestore/FirestoreDocument';
import { ActionType, AppThunk, PayloadAction } from '../StoreTypes';

export type TodoListAction = PayloadAction<FirestoreDocuments<TodoDocument>, ActionType.TODO_LIST_SUCCESS>;
export type TodoCreateAction = PayloadAction<TodoDocument, ActionType.TODO_CREATE_SUCCESS>;
export type TodoFailedAction = PayloadAction<unknown, ActionType.TODO_FAILED>;
export type TodoActions = TodoListAction | TodoCreateAction | TodoFailedAction;

export default class TodoDispatchers {
	private documentService: GoogleFirestoreDocumentService;

	constructor() {
		const container = new Container();
		this.documentService = container.resolveInstance(GoogleFirestoreDocumentService);
	}

	public todoNotes =
		(): AppThunk<Promise<TodoListAction | TodoFailedAction>> =>
		async (dispatch, getState): Promise<TodoListAction | TodoFailedAction> => {
			try {
				const { authenticate } = getState();
				if (authenticate && authenticate.token) {
					const response = await this.documentService.listDocuments<TodoDocument>('TodoItems', authenticate.token);
					return dispatch({
						type: ActionType.TODO_LIST_SUCCESS,
						payload: {
							data: response,
						},
					});
				}
			} catch (error: unknown) {
				return dispatch({
					type: ActionType.TODO_FAILED,
					payload: {
						data: error,
					},
				});
			}
			return dispatch({
				type: ActionType.TODO_FAILED,
				payload: {
					data: '',
				},
			});
		};

	public todoNoteCreate =
		(item: Partial<TodoDocument>): AppThunk<Promise<TodoCreateAction | TodoFailedAction>> =>
		async (dispatch, getState): Promise<TodoCreateAction | TodoFailedAction> => {
			try {
				const { authenticate } = getState();
				if (authenticate && authenticate.token) {
					const response = await this.documentService.createDocument<Partial<TodoDocument>, TodoDocument>('TodoItems', item, authenticate.token);
					return dispatch({
						type: ActionType.TODO_CREATE_SUCCESS,
						payload: {
							data: response,
						},
					});
				}
			} catch (error: unknown) {
				return dispatch({
					type: ActionType.TODO_FAILED,
					payload: {
						data: error,
					},
				});
			}
			return dispatch({
				type: ActionType.TODO_FAILED,
				payload: {
					data: '',
				},
			});
		};
}
