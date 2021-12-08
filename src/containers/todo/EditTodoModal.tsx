import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Button, Modal } from '../../components/ui';
import { Textfield } from '../../components/forms';
import actions from '../../store/Actions';
import RootState from '../../store/RootState';

interface EditTodoModalContainerProps {
	todoId: string;
	onSaved?: () => void;
	onCancel?: () => void;
}
type ConnectedEditTodoModalContainerProps = EditTodoModalContainerProps & ConnectedProps<typeof connector>;

interface EditTodoModalContainerState {
	title: string;
	note: string;
}
class EditTodoModalContainer extends React.PureComponent<ConnectedEditTodoModalContainerProps, EditTodoModalContainerState> {
	constructor(props: ConnectedEditTodoModalContainerProps) {
		super(props);
		const {
			todoItem: { title, note },
		} = props;

		this.state = {
			title,
			note,
		};
	}

	handleClickSave = async (): Promise<void> => {
		const { onSaved, todoNoteUpdate, todoId } = this.props;
		const { title, note } = this.state;
		await todoNoteUpdate(todoId, {
			fields: {
				title: { stringValue: title },
				note: { stringValue: note },
			},
		});
		if (onSaved) onSaved();
	};

	handleClickCancel = (): void => {
		const { onCancel } = this.props;
		if (onCancel) onCancel();
	};

	handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>): void => this.setState({ title: e.target.value });

	handleChangeNote = (e: React.ChangeEvent<HTMLInputElement>): void => this.setState({ note: e.target.value });

	renderModalFooter = (): JSX.Element => (
		<>
			<Button onClick={this.handleClickCancel} style={{ margin: '0px 8px' }}>
				Cancel
			</Button>
			<Button variant='primary' onClick={this.handleClickSave} style={{ margin: '0px 8px' }}>
				Save
			</Button>
		</>
	);

	render(): JSX.Element {
		const { title, note } = this.state;
		return (
			<Modal header={<h1>Edit todo item</h1>} footer={this.renderModalFooter()}>
				<Textfield label='Title' value={title} onChange={this.handleChangeTitle} />
				<Textfield label='Note' value={note} onChange={this.handleChangeNote} />
			</Modal>
		);
	}
}

const connector = connect(
	({ todo }: RootState, { todoId }: EditTodoModalContainerProps) => ({
		todoItem: todo.byId[todoId],
	}),
	actions
);
export default connector(EditTodoModalContainer);
