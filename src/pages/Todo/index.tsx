import React from 'react';
import { Route, Routes } from 'react-router-dom';

import TodoCreateView from './Create';
import TodoDeleteView from './Delete';
import TodoEditView from './Edit';
import TodoListView from './List';

export default class TodoPage extends React.Component {
	render(): JSX.Element {
		return (
			<>
				<TodoListView />
				<Routes>
					<Route path='create' element={<TodoCreateView />} />
					<Route path='edit/:todoId' element={<TodoEditView />} />
					<Route path='delete/:todoId' element={<TodoDeleteView />} />
				</Routes>
			</>
		);
	}
}
