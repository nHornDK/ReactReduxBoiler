import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RoundedBox } from '../../components/ui';
import actions from '../../store/Actions';
import RootState from '../../store/RootState';

type TodoListViewProps = ConnectedProps<typeof connector>;

class TodoListView extends React.Component<TodoListViewProps> {
	async componentDidMount(): Promise<void> {
		const { todoNotesAsync } = this.props;
		await todoNotesAsync();
	}

	handleCreate = async (): Promise<void> => {
		const { todoNoteCreateAsync } = this.props;
		await todoNoteCreateAsync({
			fields: {
				title: { stringValue: 'a little title' },
				note: { stringValue: 'a little note' },
			},
		});
	};

	render(): JSX.Element {
		const { todoItems } = this.props;
		console.log('render', todoItems);
		return (
			<div>
				<h1>TodoListView</h1>
				{todoItems?.map((item) => (
					<RoundedBox key={item.name}>
						<br />
						<b>Title:</b>
						{item.title}
						<br />
						<b>Note:</b>
						{item.note}
						<br />
					</RoundedBox>
				))}
				<button type='button' onClick={this.handleCreate}>
					create
				</button>
			</div>
		);
	}
}

const connector = connect(
	({ todo }: RootState) => ({
		todoItems: todo.items,
	}),
	actions
);
export default connector(TodoListView);
