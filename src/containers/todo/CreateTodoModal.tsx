import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Button, Modal } from '../../components/ui';
import { Textfield, Textarea } from '../../components/forms';
import actions from '../../store/Actions';

interface CreateTodoModalContainerProps {
	onCreated?: () => void;
	onCancel?: () => void;
}
type ConnectedCreateTodoModalContainerProps = CreateTodoModalContainerProps & ConnectedProps<typeof connector>;

interface CreateTodoModalContainerState {
	title: string;
	note: string;
}
class CreateTodoModalContainer extends React.PureComponent<ConnectedCreateTodoModalContainerProps, CreateTodoModalContainerState> {
	constructor(props: ConnectedCreateTodoModalContainerProps) {
		super(props);
		this.state = {
			title: '',
			note: '',
		};
	}

	handleClickSave = async (): Promise<void> => {
		const { todoNoteCreate: todoNoteCreateAsync, onCreated } = this.props;
		const { title, note } = this.state;
		await todoNoteCreateAsync({
			fields: {
				title: { stringValue: title },
				note: { stringValue: note },
			},
		});
		if (onCreated) onCreated();
	};

	handleClickCancel = (): void => {
		const { onCancel } = this.props;
		if (onCancel) onCancel();
	};

	handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>): void => this.setState({ title: e.target.value });

	handleChangeNote = (e: React.ChangeEvent<HTMLTextAreaElement>): void => this.setState({ note: e.target.value });

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
			<Modal header={<h1>Create todo item</h1>} footer={this.renderModalFooter()}>
				<Textfield label='Title' value={title} onChange={this.handleChangeTitle} />
				<Textarea label='Note' value={note} onChange={this.handleChangeNote} />
			</Modal>
		);
	}
}

const connector = connect(() => ({}), actions);
export default connector(CreateTodoModalContainer);
