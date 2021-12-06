import React from 'react';
import ReactDOM from 'react-dom';

import styles from './index.module.scss';

const documentBody = document.querySelector('body');
const appRoot = document.querySelector('#root');
export interface ModalPortalProps {
	appRootSelector?: string;
}
export default class ModalPortal extends React.Component<ModalPortalProps> {
	private modalElement: HTMLDivElement;

	constructor(props: ModalPortalProps) {
		super(props);
		this.modalElement = document.createElement('div');
	}

	componentDidMount(): void {
		// The portal element is inserted in the DOM tree after
		// the Modal's children are mounted, meaning that children
		// will be mounted on a detached DOM node. If a child
		// component requires to be attached to the DOM tree
		// immediately when mounted, for example to measure a
		// DOM node, or uses 'autoFocus' in a descendant, add
		// state to Modal and only render the children when Modal
		// is inserted in the DOM tree.
		this.modalElement.classList.add(styles.modalPortal);
		documentBody?.append(this.modalElement);
		appRoot?.classList.add(styles.appRoot);
	}

	componentWillUnmount(): void {
		appRoot?.classList.remove(styles.appRoot);
		this.modalElement.classList.remove(styles.ModalPortal);
		this.modalElement.remove();
	}

	render(): JSX.Element {
		const { children } = this.props;
		return ReactDOM.createPortal(children, this.modalElement);
	}
}
