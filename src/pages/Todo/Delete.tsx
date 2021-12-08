import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { DeleteTodoModal } from '../../containers/todo';

const TodoDeleteView: React.FC = () => {
	const navigate = useNavigate();
	const { todoId } = useParams();
	if (!todoId) return <div>Not found</div>;
	return <DeleteTodoModal todoId={todoId} onDeleted={(): void => navigate('/todo', { replace: true })} onCancel={(): void => navigate('/todo', { replace: true })} />;
};

export default TodoDeleteView;
