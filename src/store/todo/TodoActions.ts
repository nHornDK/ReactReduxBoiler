import Container from '@fluffy-spoon/inverse';

import { GoogleFirestoreDocumentService } from '../../infrastructure/services';
import { TodoDocument } from '../../models/firestore';
import { FirestoreDocuments } from '../../models/firestore/FirestoreDocument';
import { ActionType, AppThunk, PayloadAction } from '../StoreTypes';

export type TodoListAction = PayloadAction<FirestoreDocuments<TodoDocument>, ActionType.TODO_LIST_SUCCESS>;
export type TodoCreateAction = PayloadAction<TodoDocument, ActionType.TODO_CREATE_SUCCESS>;
export type TodoUpdateAction = PayloadAction<TodoDocument, ActionType.TODO_UPDATE_SUCCESS>;
export type TodoDeleteAction = PayloadAction<string, ActionType.TODO_DELETE_SUCCESS>;
export type TodoFailedAction = PayloadAction<unknown, ActionType.TODO_FAILED>;
export type TodoActions = TodoListAction | TodoCreateAction | TodoUpdateAction | TodoDeleteAction | TodoFailedAction;

export default class TodoDispatchers {
	private documentService: GoogleFirestoreDocumentService;

	constructor() {
		const container = new Container();
		this.documentService = container.resolveInstance(GoogleFirestoreDocumentService);
	}

	private todoFailed = (data: string): TodoFailedAction => ({ type: ActionType.TODO_FAILED, payload: { data } });

	private todoListSuccess = (data: FirestoreDocuments<TodoDocument>): TodoFailedAction => ({ type: ActionType.TODO_FAILED, payload: { data } });

	public todoNotesList =
		(): AppThunk<Promise<TodoListAction | TodoFailedAction>> =>
		async (dispatch, getState): Promise<TodoListAction | TodoFailedAction> => {
			try {
				const { authenticate } = getState();
				if (authenticate && authenticate.token) {
					const response = await this.documentService.listDocuments<TodoDocument>('TodoItems', authenticate.token);
					return dispatch(this.todoListSuccess(response));
				}
			} catch (error: unknown) {
				return dispatch(this.todoFailed(JSON.stringify(error)));
			}
			return dispatch(this.todoFailed('todoNotes failed'));
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
				return dispatch(this.todoFailed(JSON.stringify(error)));
			}
			return dispatch(this.todoFailed('yeet'));
		};

	public todoNoteUpdate =
		(id: string, item: Partial<TodoDocument>): AppThunk<Promise<TodoUpdateAction | TodoFailedAction>> =>
		async (dispatch, getState): Promise<TodoUpdateAction | TodoFailedAction> => {
			try {
				const { authenticate } = getState();
				if (authenticate && authenticate.token) {
					const response = await this.documentService.updateDocument<Partial<TodoDocument>, TodoDocument>('TodoItems', id, item, authenticate.token);
					return dispatch({
						type: ActionType.TODO_UPDATE_SUCCESS,
						payload: {
							data: response,
						},
					});
				}
			} catch (error: unknown) {
				return dispatch(this.todoFailed(JSON.stringify(error)));
			}
			return dispatch(this.todoFailed('yeet'));
		};

	public todoNoteDelete =
		(id: string): AppThunk<Promise<TodoDeleteAction | TodoFailedAction>> =>
		async (dispatch, getState): Promise<TodoDeleteAction | TodoFailedAction> => {
			try {
				const { authenticate } = getState();
				if (authenticate && authenticate.token) {
					await this.documentService.deleteDocument('TodoItems', id, authenticate.token);
					return dispatch({
						type: ActionType.TODO_DELETE_SUCCESS,
						payload: { data: id },
					});
				}
			} catch (error: unknown) {
				return dispatch(this.todoFailed(JSON.stringify(error)));
			}
			return dispatch(this.todoFailed('yeet'));
		};
}
