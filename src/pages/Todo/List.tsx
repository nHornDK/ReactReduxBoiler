import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui';
import { ListTodo } from '../../containers/todo';

const TodoListView: React.FC = () => {
	const navigate = useNavigate();
	const handleClickCreate = (): void => navigate('/todo/create', { replace: true });
	const handleClickEdit = (todoId: string): void => navigate(`/todo/edit/${todoId}`, { replace: true });
	const handleClickDelete = (todoId: string): void => navigate(`/todo/delete/${todoId}`, { replace: true });
	return (
		<div style={{ width: '800px', margin: '0 auto' }}>
			<h1>Todo Items</h1>
			<ListTodo onClickEdit={handleClickEdit} onClickDelete={handleClickDelete} />
			<Button variant='primary' onClick={handleClickCreate}>
				Create
			</Button>
		</div>
	);
};

export default TodoListView;
