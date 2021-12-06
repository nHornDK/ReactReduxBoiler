import { Injectable } from '@fluffy-spoon/inverse';
import HttpClient from './HttpClient';

@Injectable
class SimpleHttpClient implements HttpClient {
	private defaultRequestBase: Partial<RequestInit> = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	constructor(requestOptions?: Partial<RequestInit>) {
		this.defaultRequestBase = {
			...this.defaultRequestBase,
			...requestOptions,
		};
	}

	get = async <TResponse>(url: string, requestOptions: Partial<RequestInit> = this.defaultRequestBase): Promise<TResponse> => {
		const response = await fetch(url, requestOptions);
		return response.json();
	};

	post = async <TRequest, TResponse>(url: string, data: TRequest, requestOptions: Partial<RequestInit> = this.defaultRequestBase): Promise<TResponse> => {
		const response = await fetch(url, {
			method: 'POST',
			body: typeof data === 'string' ? data : JSON.stringify(data),
			...requestOptions,
		});
		return response.json();
	};

	put = async <TRequest, TResponse>(url: string, data: TRequest, requestOptions: Partial<RequestInit> = this.defaultRequestBase): Promise<TResponse> => {
		const response = await fetch(url, {
			method: 'PUT',
			body: JSON.stringify(data),
			...requestOptions,
		});
		return response.json();
	};

	patch = async <TRequest, TResponse>(url: string, data: TRequest, requestOptions: Partial<RequestInit> = this.defaultRequestBase): Promise<TResponse> => {
		const response = await fetch(url, {
			method: 'PATCH',
			body: JSON.stringify(data),
			...requestOptions,
		});
		return response.json();
	};
}
export default SimpleHttpClient;
