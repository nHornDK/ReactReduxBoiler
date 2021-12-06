import React from 'react';

import styles from './index.module.scss';

export type ButtonVariant = 'default' | 'primary' | 'warning' | 'error';
export interface ButtonProps {
	variant?: ButtonVariant;
	children: React.ReactNode;
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
const Button: React.FC<ButtonProps> = ({ children, variant = 'default' }) => (
	<button type='button' className={`${styles.button} ${getVariantStyles(variant)}`}>
		{children}
	</button>
);
export default Button;
