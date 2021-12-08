import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Button } from '../../components/ui';

import { GoogleAuthenticationService } from '../../infrastructure/services';
import actions from '../../store/Actions';
import RootState from '../../store/RootState';

type AuthProps = ConnectedProps<typeof connector>;

class AuthPage extends React.Component<AuthProps> {
	componentDidMount(): void {
		this.handleAuthCallback();
	}

	handleAuthCallback = async (): Promise<void> => {
		const {
			location: { search },
		} = window;
		const { authenticate: authenticateAsync } = this.props;
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
		const {
			authenticate: { token },
		} = this.props;
		return (
			<div>
				<h1>Auth page</h1>
				<p>access_token: {token?.access_token}</p>
				<Button variant='primary' onClick={this.handleClickAuth}>
					Login to your google account
				</Button>
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
