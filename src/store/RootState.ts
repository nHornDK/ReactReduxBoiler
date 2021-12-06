import AuthenticateState from './authenticate/AuthenticateState';
import TodoState from './todo/TodoState';

interface RootState {
	authenticate: AuthenticateState;
	todo: TodoState;
}
export default RootState;
