import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AuthPage from '../pages/Auth';
import HomePage from '../pages/Home';
import TodoPage from '../pages/Todo';
import store from '../store';
import './index.scss';
import logo from './logo.svg';

const App: React.FC = () => (
	<Provider store={store}>
		<BrowserRouter>
			<div className='App'>
				<header className='App-header'>
					<img src={logo} className='App-logo' alt='logo' />
				</header>
				<HomePage />
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
