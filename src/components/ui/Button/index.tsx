import React from 'react';
import ButtonBase from '../ButtonBase';

import styles from './index.module.scss';

export type ButtonVariant = 'default' | 'primary' | 'warning' | 'error';
export interface ButtonProps {
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	variant?: ButtonVariant;
	children: React.ReactNode;
	style?: React.CSSProperties;
	className?: string;
}
const getVariantStyles = (variant: ButtonVariant): string => {
	switch (variant) {
		case 'primary':
			return styles.buttonPrimaryVariant;
		case 'error':
			return styles.buttonErrorVariant;
		case 'warning':
			return styles.buttonWarningVariant;
		case 'default':
		default:
			return styles.buttonDefaultVariant;
	}
};
const Button: React.FC<ButtonProps> = ({ children, className, variant = 'default', onClick, style }) => (
	<ButtonBase className={`${styles.button} ${getVariantStyles(variant)} ${className || ''}`} onClick={onClick} style={style}>
		{children}
	</ButtonBase>
);
export default Button;
