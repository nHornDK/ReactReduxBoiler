import React from 'react';

import ModalPortal from './ModalPortal';
import styles from './index.module.scss';

export interface ModalProps {
	show?: boolean;
	header?: React.ReactNode;
	children: React.ReactNode;
	footer?: React.ReactNode;
}

const ModalBackdrop: React.FC = () => <div className={styles.modalBackdrop} />;
const ModalHeader: React.FC = ({ children }) => (children ? <div className={styles.modalHeader}>{children}</div> : null);
const ModalFooter: React.FC = ({ children }) => (children ? <div className={styles.modalFooter}>{children}</div> : null);
const ModalContent: React.FC = ({ children }) => (children ? <div className={styles.modalContent}>{children}</div> : null);

export default class Modal extends React.Component<ModalProps> {
	render(): JSX.Element {
		const { header, footer, children } = this.props;
		return (
			<ModalPortal>
				<ModalBackdrop />
				<div className={`${styles.modalContainer} animate__animated animate__tada`}>
					<ModalHeader>{header}</ModalHeader>
					<ModalContent>{children}</ModalContent>
					<ModalFooter>{footer}</ModalFooter>
				</div>
			</ModalPortal>
		);
	}
}
