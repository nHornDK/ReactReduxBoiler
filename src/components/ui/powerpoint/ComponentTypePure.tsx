import React from 'react';

interface HelloWorldProps {
	text?: string;
}

export default class HelloWorld extends React.PureComponent<HelloWorldProps> {
	render(): React.ReactNode {
		const { text = '' } = this.props;
		return (
			<p>
				Hello World!
				{text}
			</p>
		);
	}
}
