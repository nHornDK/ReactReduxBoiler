import React from 'react';
import { useNavigate } from 'react-router-dom';

import { CreateTodoModal } from '../../containers/todo';

const TodoCreateView: React.FC = () => {
	const navigate = useNavigate();
	return <CreateTodoModal onCreated={(): void => navigate('/todo', { replace: true })} onCancel={(): void => navigate('/todo', { replace: true })} />;
};

export default TodoCreateView;
