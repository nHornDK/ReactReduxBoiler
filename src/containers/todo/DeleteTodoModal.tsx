import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Button, Modal } from '../../components/ui';
import actions from '../../store/Actions';
import DisplayTodo from './DisplayTodo';

interface DeleteTodoModalContainerProps {
	todoId: string;
	onDeleted?: () => void;
	onCancel?: () => void;
}
type ConnectedDeleteTodoModalContainerProps = DeleteTodoModalContainerProps & ConnectedProps<typeof connector>;

class DeleteTodoModalContainer extends React.Component<ConnectedDeleteTodoModalContainerProps> {
	handleClickDelete = async (): Promise<void> => {
		const { onDeleted, todoNoteDelete, todoId } = this.props;
		await todoNoteDelete(todoId);
		if (onDeleted) onDeleted();
	};

	handleClickCancel = (): void => {
		const { onCancel } = this.props;
		if (onCancel) onCancel();
	};

	renderModalFooter = (): JSX.Element => (
		<>
			<Button onClick={this.handleClickCancel} style={{ margin: '0px 8px' }}>
				Cancel
			</Button>
			<Button variant='error' onClick={this.handleClickDelete} style={{ margin: '0px 8px' }}>
				Delete
			</Button>
		</>
	);

	render(): JSX.Element {
		const { todoId } = this.props;
		return (
			<Modal header={<h1>Delete todo item?</h1>} footer={this.renderModalFooter()}>
				<DisplayTodo todoId={todoId} />
			</Modal>
		);
	}
}

const connector = connect(() => ({}), actions);
export default connector(DeleteTodoModalContainer);
