import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { IconButton, RoundedBox } from '../../components/ui';
import actions from '../../store/Actions';
import RootState from '../../store/RootState';
import { DeleteIcon, EditIcon } from '../../components/icons';
import styles from './index.module.scss';

interface DisplayTodoContainerProps {
	todoId: string;
	onClickEdit?: (todoId: string) => void;
	onClickDelete?: (todoId: string) => void;
}
type ConnectedDisplayTodoContainerProps = DisplayTodoContainerProps & ConnectedProps<typeof connector>;

class DisplayTodoContainer extends React.PureComponent<ConnectedDisplayTodoContainerProps> {
	render(): JSX.Element {
		const { todoId, todoItem, onClickEdit, onClickDelete } = this.props;
		return (
			<RoundedBox>
				<div className={styles.displayTodoHeader}>
					<span className={styles.displayTodoTitle}>{todoItem.title}</span>
					{onClickEdit && (
						<IconButton onClick={(): void => onClickEdit(todoId)}>
							<EditIcon className={styles.editIcon} />
						</IconButton>
					)}
					{onClickDelete && (
						<IconButton onClick={(): void => onClickDelete(todoId)}>
							<DeleteIcon className={styles.deleteIcon} />
						</IconButton>
					)}
				</div>
				<div className={styles.displayTodoContent}>{todoItem.note}</div>
			</RoundedBox>
		);
	}
}

const connector = connect(
	({ todo }: RootState, { todoId }: DisplayTodoContainerProps) => ({
		todoItem: todo.byId[todoId],
	}),
	actions
);
export default connector(DisplayTodoContainer);
