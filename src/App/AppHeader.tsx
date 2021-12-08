import React from 'react';
import NavButton from './NavButton';

const AppHeader: React.FC = () => (
	<header className='App-header'>
		<NavButton to='/' end>
			Home
		</NavButton>
		<NavButton to='/auth' end={false}>
			Authenticate
		</NavButton>
		<NavButton to='/todo' end={false}>
			Todo
		</NavButton>
	</header>
);

export default AppHeader;
