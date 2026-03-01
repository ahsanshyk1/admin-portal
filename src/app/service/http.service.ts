import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
	providedIn: 'root'
})
export class HttpService {
	private http = inject(HttpClient);
	private api = 'http://localhost:5000/api/';
	constructor() { }

	get(route: string, params: { [key: string]: string | boolean | number; } = {}, headers: { [key: string]: string | string[]; } = {}) {
		return this.http.get<any>(`${this.api}${route}`, { params, headers });
	}

	post(route: string, body: any, params: { [key: string]: string | boolean | number; } = {}, headers: { [key: string]: string | string[]; } = {}) {
		return this.http.post<any>(`${this.api}${route}`, body, { params, headers });
	}

	put(route: string, body: any, params: { [key: string]: string | boolean | number; } = {}, headers: { [key: string]: string | string[]; } = {}) {
		return this.http.put<any>(`${this.api}${route}`, body, { params, headers });
	}

	delete(route: string, params: { [key: string]: string | boolean | number; } = {}, body: any = {}, headers: { [key: string]: string | string[]; } = {}) {
		return this.http.delete<any>(`${this.api}${route}`, { params, body, headers });
	}

	getByUrl(url: string, params: { [key: string]: string | boolean | number; } = {}) {
		return this.http.get<any>(`${url}`, { params });
	}

	postByUrl(url: string, headers: Record<string, string | string[]>, body: any) {
		return this.http.post<any>(`${url}`, body, { headers: headers });
	}
}
