/* eslint-disable react/no-unused-class-component-methods */

/* eslint-disable @typescript-eslint/no-unused-vars */
import Container from '@fluffy-spoon/inverse';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RoundedBox } from '../../components/ui';
import { GoogleAuthenticationService } from '../../infrastructure/services';
import { GevirNoteDocument } from '../../models/firestore/GevirNoteDocument';
import actions from '../../store/Actions';
import RootState from '../../store/RootState';

type AuthProps = ConnectedProps<typeof connector>;

interface AuthState {
	gevirNotes: GevirNoteDocument[];
}
class AuthPage extends React.Component<AuthProps, AuthState> {
	private authenticationService: GoogleAuthenticationService;

	constructor(props: AuthProps) {
		super(props);
		this.state = {
			gevirNotes: [],
		};
		const container = new Container();
		this.authenticationService = container.resolveInstance(GoogleAuthenticationService);
	}

	componentDidMount(): void {
		console.log('componentDidMount', { props: this.props });
		// try {
		// 	// const notes = await this.firestoreService.getGevirNotes();
		// 	this.setState({ gevirNotes: notes?.documents ?? [] });
		// 	console.log({ notes });
		// } catch (error: unknown) {
		// 	console.error(error);
		// }
		this.handleAuthCallback();
	}

	handleAuthCallback = async (): Promise<void> => {
		const {
			location: { search },
		} = window;
		const { authenticateAsync } = this.props;
		const urlParams = new URLSearchParams(search);
		const code = urlParams.get('code');
		console.log('handleAuthCallback', { props: this.props, code });
		if (code) {
			console.log('get token', { props: this.props, code });
			await authenticateAsync(code);
			window.location.href = '/todo';
		}
	};

	handleClickAuth: React.MouseEventHandler<HTMLButtonElement> = () => {
		window.location.href = GoogleAuthenticationService.getAuthenticationUrl();
	};

	render(): JSX.Element {
		const { gevirNotes } = this.state;
		const {
			authenticate: { token },
		} = this.props;
		console.log('render', { token });
		// if (/* this.IsAuthenticated() && authenticate.userInfo */ false) {
		// 	return <Redirect to={'/'} />;
		// }
		return (
			<div>
				<h1>Auth page</h1>
				<p>access_token: {token?.access_token}</p>
				<button type='button' onClick={this.handleClickAuth}>
					Login to your google account
				</button>
				{gevirNotes.map((n) => (
					<RoundedBox key={n.name}>
						<b>{n.name}</b>
						<br />
						Title2:
						{n.fields.Title.stringValue}
						<br />
						Note:
						{n.fields.Note.stringValue}
						<br />
					</RoundedBox>
				))}
			</div>
		);
	}
}

const connector = connect(
	({ authenticate }: RootState) => ({
		authenticate,
	}),
	actions
);
export default connector(AuthPage);
