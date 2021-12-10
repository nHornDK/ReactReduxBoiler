import React from 'react';

import styles from './index.module.scss';

export type ButtonBaseVariant = 'default' | 'primary' | 'warning' | 'error';
export interface ButtonBaseProps {
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	children: React.ReactNode;
	style?: React.CSSProperties;
	className?: string;
}
const ButtonBase: React.FC<ButtonBaseProps> = ({ children, className, onClick, style }) => (
	<button type='button' className={`${styles.buttonBase} ${className || ''}`} onClick={onClick} style={style}>
		{children}
	</button>
);
export default ButtonBase;
