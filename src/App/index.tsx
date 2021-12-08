import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppHeader from './AppHeader';
import AuthPage from '../pages/Auth';
import HomePage from '../pages/Home';
import TodoPage from '../pages/Todo';
import store from '../store';
import './index.scss';
import 'animate.css';

const App: React.FunctionComponent = () => (
	<Provider store={store}>
		<BrowserRouter>
			<div className='App'>
				<AppHeader />
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/auth/*' element={<AuthPage />} />
					<Route path='/todo/*' element={<TodoPage />} />
				</Routes>
			</div>
		</BrowserRouter>
	</Provider>
);

export default App;
