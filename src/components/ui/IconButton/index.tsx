import React, { ButtonHTMLAttributes } from 'react';

import './icon-button.scss';

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

class IconButton extends React.PureComponent<IconButtonProps> {
	static defaultProps: Partial<IconButtonProps> = {
		children: '',
	};

	render(): JSX.Element {
		const { children, className, ...props } = this.props;
		return (
			<button type='button' className={`icon-button ${className || ''}`} {...props}>
				{children}
			</button>
		);
	}
}

export default IconButton;
