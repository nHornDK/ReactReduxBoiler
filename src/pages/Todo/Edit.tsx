import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { EditTodoModal } from '../../containers/todo';

const TodoEditView: React.FC = () => {
	const navigate = useNavigate();
	const { todoId } = useParams();
	if (!todoId) return <div>Not found</div>;
	return <EditTodoModal todoId={todoId} onSaved={(): void => navigate('/todo', { replace: true })} onCancel={(): void => navigate('/todo', { replace: true })} />;
};

export default TodoEditView;
