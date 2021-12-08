import React from 'react';

import styles from './index.module.scss';

export type TextareadVariant = 'default' | 'primary' | 'warning' | 'error';
export interface TextareaProps {
	onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
	value?: string;
	label?: string;
}
const Textarea: React.FC<TextareaProps> = ({ label, value, onChange }) => {
	const uniqIdent = `${Math.floor(Math.random() * 0xffff)}`;
	return (
		<div className={`${styles.textareaGroup}`}>
			<textarea id={uniqIdent} value={value} required className={`${styles.textarea}`} onChange={onChange} />
			<span className={`${styles.textareaHighlight}`} />
			<span className={`${styles.textareaBar}`} />
			<label htmlFor={uniqIdent} className={`${styles.textareaLabel}`}>
				{label}
			</label>
		</div>
	);
};
export default Textarea;
