import React from 'react';
import { useMatch, useResolvedPath, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui';

interface NavButtonProps {
	to: string;
	end: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ children, to, end = false }) => {
	const resolved = useResolvedPath(to);
	const match = useMatch({ path: resolved.pathname, end });
	const navigate = useNavigate();
	return (
		<Button variant={match ? 'primary' : 'default'} onClick={(): void => navigate(to, { replace: true })} style={{ margin: '0 8px' }}>
			{children}
		</Button>
	);
};

export default NavButton;
