import React from 'react';

import { Modal, Button } from '../../components/ui';

const ModalFooter: React.FC = () => (
	<>
		<Button>Cancel</Button>
		<Button variant='primary'>Save</Button>
	</>
);
export default class TodoEditView extends React.Component {
	render(): JSX.Element {
		return (
			<Modal header={<h1>Edit todo item</h1>} footer={<ModalFooter />}>
				<p>Edit a todo list item</p>
			</Modal>
		);
	}
}
