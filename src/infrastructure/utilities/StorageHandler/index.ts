export interface StorageHandler<TState> {
	loadState: () => TState;
	saveState: (state: TState) => void;
}
export default class SessionStorageHandler<TState> implements StorageHandler<TState> {
	private defaultState: TState;

	private storageKey = 'state';

	constructor(initialState: TState) {
		this.defaultState = initialState;
	}

	private dateParser = (_key: string, value: unknown): Date | unknown => {
		const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
		if (typeof value === 'string' && dateFormat.test(value)) {
			return new Date(value);
		}

		return value;
	};

	private getKeys = (): string[] => {
		const serializedState = localStorage.getItem(`${this.storageKey}_Keys`);

		if (serializedState === null) {
			return [];
		}

		return JSON.parse(serializedState, this.dateParser);
	};

	private setKeys = (keys: string[]): void => {
		const serializedState = JSON.stringify(keys);
		localStorage.setItem(`${this.storageKey}_Keys`, serializedState);
	};

	loadState = (): TState => {
		try {
			let state = this.defaultState;
			const stateKeys = this.getKeys();

			stateKeys.map((k, i) => {
				const stateKey = k as keyof TState;
				const sp = this.loadSessionState(stateKey);
				state = {
					...state,
					...(sp ? { [stateKey]: sp } : {}),
				};
				return { s: stateKey, i };
			});
			return state;
		} catch (error) {
			console.error('loadState error', error);
			return this.defaultState;
		}
	};

	saveState = (state: TState): void => {
		try {
			const stateKeys = Object.keys(state);
			this.setKeys(stateKeys);
			stateKeys.map((stateKey, i) => {
				const statePart = state[stateKey as keyof TState];
				this.saveSessionState(statePart, stateKey as keyof TState);
				return { s: stateKey, i };
			});
		} catch (error: unknown) {
			console.error(error);
		}
	};

	private loadSessionState = <TModel = TState>(key: keyof TModel): unknown => {
		try {
			const serializedState = sessionStorage.getItem(`${this.storageKey}_${key}`);

			if (serializedState === null) {
				return undefined;
			}
			const parsedState = JSON.parse(serializedState, this.dateParser);
			return parsedState;
		} catch (error: unknown) {
			console.error(error);
		}
		return undefined;
	};

	private saveSessionState = <TStatePart, TModel = TState>(statePart: TStatePart, key: keyof TModel): void => {
		try {
			const serializedState = JSON.stringify(statePart);
			sessionStorage.setItem(`${this.storageKey}_${key}`, serializedState);
		} catch (error: unknown) {
			console.error(error);
		}
	};
}
