import React from 'react';

import styles from './RoundedBox.module.scss';

export interface RoundedBoxProps {
	children: React.ReactNode;
}

const RoundedBox: React.FC<RoundedBoxProps> = ({ children }) => <div className={styles.roundedBox}>{children}</div>;
export default RoundedBox;
