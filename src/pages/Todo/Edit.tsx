import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { EditTodoModal } from '../../containers/todo';

const TodoEditView: React.FC = () => {
	const navigate = useNavigate();
	const { todoId } = useParams();
	if (!todoId) return <div>Not found</div>;

	const navigateToTodoList = (): void => navigate('/todo', { replace: true });
	return <EditTodoModal todoId={todoId} onSaved={navigateToTodoList} onCancel={navigateToTodoList} />;
};

export default TodoEditView;
