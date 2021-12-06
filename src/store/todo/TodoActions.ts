/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Container from '@fluffy-spoon/inverse';

import { GoogleFirestoreDocumentService } from '../../infrastructure/services';
import { TodoDocument } from '../../models/firestore';
import { FirestoreDocuments } from '../../models/firestore/FirestoreDocument';
import { ActionTypeEnum, AppThunk, PayloadAction } from '../StoreTypes';

export type TodoAction = PayloadAction<FirestoreDocuments<TodoDocument>>;
export type TodoCreateAction = PayloadAction<TodoDocument>;
export type TodoFailedAction = PayloadAction<unknown>;
export type TodoActions = TodoAction | TodoCreateAction | TodoFailedAction;

export default class TodoDispatchers {
	private documentService: GoogleFirestoreDocumentService;

	constructor() {
		const container = new Container();
		this.documentService = container.resolveInstance(GoogleFirestoreDocumentService);
	}

	// eslint-disable-next-line unicorn/consistent-function-scoping
	public todoNotesAsync = (): AppThunk<Promise<TodoAction | TodoFailedAction>> => async (dispatch, getState) => {
		try {
			const { authenticate } = getState();
			if (authenticate && authenticate.token) {
				const response = await this.documentService.listDocuments<TodoDocument>('TodoItems', authenticate.token);
				return dispatch({
					type: ActionTypeEnum.TODO_LIST_SUCCESS,
					payload: {
						data: response,
					},
				});
			}
		} catch (error: unknown) {
			return dispatch({
				type: ActionTypeEnum.TODO_LIST_FAILED,
				payload: {
					data: error,
				},
			});
		}
		return dispatch({
			type: ActionTypeEnum.TODO_LIST_FAILED,
			payload: {
				data: '',
			},
		});
	};

	public todoNoteCreateAsync =
		(item: Partial<TodoDocument>): AppThunk<Promise<TodoCreateAction | TodoFailedAction>> =>
		async (dispatch, getState) => {
			try {
				const { authenticate } = getState();
				if (authenticate && authenticate.token) {
					const response = await this.documentService.createDocument<Partial<TodoDocument>, TodoDocument>('TodoItems', item, authenticate.token);
					return dispatch({
						type: ActionTypeEnum.TODO_CREATE_SUCCESS,
						payload: {
							data: response,
						},
					});
				}
			} catch (error: unknown) {
				return dispatch({
					type: ActionTypeEnum.TODO_CREATE_FAILED,
					payload: {
						data: error,
					},
				});
			}
			return dispatch({
				type: ActionTypeEnum.TODO_CREATE_FAILED,
				payload: {
					data: '',
				},
			});
		};
}
