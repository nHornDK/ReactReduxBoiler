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
	private timeout: NodeJS.Timeout | undefined;

	async componentDidMount(): Promise<void> {
		this.fetchNotes();
	}

	componentWillUnmount(): void {
		if (!this.timeout) {
			clearTimeout(this.timeout);
		}
	}

	fetchNotes = async (): Promise<void> => {
		const { todoNotesList: todoNotes } = this.props;
		await todoNotes();
		this.timeout = setTimeout(this.fetchNotes, 1000);
	};

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
