import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './http.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token';

  constructor(private router: Router, private http: HttpService) {}

  async login(email: any, password: any): Promise<boolean> {
    try {
      const res: any = await firstValueFrom(this.http.post('/auth/login', { email, password }));
      // Accept common token fields
      const token = res?.token || res?.accessToken || res?.authToken || res?.data?.token;
      if (token) {
        localStorage.setItem(this.tokenKey, token);
        return true;
      }
      // If backend returns success flag without token, treat as success
      if (res?.success === true) return true;
      return false;
    } catch (err) {
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
