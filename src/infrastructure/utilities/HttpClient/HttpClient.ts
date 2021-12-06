export default interface HttpClient {
	get<TResponse>(url: string, requestOptions?: Partial<RequestInit>): Promise<TResponse>;
	post<TRequest, TResponse>(url: string, data: TRequest, requestOptions?: Partial<RequestInit>): Promise<TResponse>;
	put<TRequest, TResponse>(url: string, data: TRequest, requestOptions?: Partial<RequestInit>): Promise<TResponse>;
	patch<TRequest, TResponse>(url: string, data: TRequest, requestOptions?: Partial<RequestInit>): Promise<TResponse>;
}
