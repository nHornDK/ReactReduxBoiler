import AuthenticateDispatchers, { AuthenticateActions } from './authenticate/AuthenticateActions';
import TodoDispatchers, { TodoActions } from './todo/TodoActions';

export type RootActions = AuthenticateActions & TodoActions;

const authenticate = new AuthenticateDispatchers();
const todo = new TodoDispatchers();

export default {
	...authenticate,
	...todo,
};
