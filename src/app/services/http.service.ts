import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private http = inject(HttpClient);
  private api = config.apiEndpoint;

  constructor() { }

  get(route: string, params: { [key: string]: string | boolean | number; } = {}) {
    return this.http.get<any>(`${this.api}${route}`, { params });
  }

  post(route: string, body: any, params: { [key: string]: string | boolean | number; } = {}) {
    return this.http.post<any>(`${this.api}${route}`, body, { params });
  }

  put(route: string, body: any, params: { [key: string]: string | boolean | number; } = {}) {
    return this.http.put<any>(`${this.api}${route}`, body, { params });
  }

  delete(route: string, params: { [key: string]: string | boolean | number; }, body: any = {}) {
    return this.http.delete<any>(`${this.api}${route}`, { params, body });
  }
}
