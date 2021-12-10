import React from 'react';
import styles from './index.module.scss';

export type TextfieldVariant = 'default' | 'primary' | 'warning' | 'error';
export interface TextfieldProps {
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	value?: string;
	label?: string;
}

const Textfield: React.FC<TextfieldProps> = ({ label, value, onChange }) => {
	const uniqIdent = `${Math.floor(Math.random() * 0xffff)}`;
	return (
		<div className={`${styles.textfieldGroup}`}>
			<input id={uniqIdent} type='text' value={value} required className={`${styles.textfield}`} onChange={onChange} />
			<span className={`${styles.textfieldHighlight}`} />
			<span className={`${styles.textfieldBar}`} />
			<label htmlFor={uniqIdent} className={`${styles.textfieldLabel}`}>
				{label}
			</label>
		</div>
	);
};

export default React.memo(Textfield);
