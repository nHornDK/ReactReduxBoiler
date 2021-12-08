import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import DisplayTodo from './DisplayTodo';
import actions from '../../store/Actions';
import RootState from '../../store/RootState';

interface ListTodoContainerProps {
	onClickEdit?: (todoId: string) => void;
	onClickDelete?: (todoId: string) => void;
}
type ConnectedListTodoContainerProps = ListTodoContainerProps & ConnectedProps<typeof connector>;

class ListTodoContainer extends React.PureComponent<ConnectedListTodoContainerProps> {
	async componentDidMount(): Promise<void> {
		const { todoNotes: todoNotesAsync } = this.props;
		await todoNotesAsync();
	}

	render(): JSX.Element {
		const { allIds, onClickEdit, onClickDelete } = this.props;
		return (
			<div>
				{allIds?.map((todoId) => (
					<DisplayTodo key={todoId} todoId={todoId} onClickEdit={onClickEdit} onClickDelete={onClickDelete} />
				))}
			</div>
		);
	}
}

const connector = connect(
	({ todo }: RootState) => ({
		allIds: todo.allIds,
	}),
	actions
);
export default connector(ListTodoContainer);
