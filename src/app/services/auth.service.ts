import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { LoginRequest, LoginResponse, RegisterRequest, MessageResponse, User, UserDetail } from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl;
  private tokenKey = 'authToken';

  getUserDetail(): UserDetail | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decodedToken = jwtDecode<User>(token);
      return {
        id: decodedToken.sub,
        email: decodedToken.email,
        username: decodedToken.name
      };
    } catch (error) {
      console.error('Failed to decode token', error);
      return null;
    }
  }

  constructor() { }

  register(userData: RegisterRequest): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${this.apiUrl}/register`, userData);
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials);
  }

  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }
}
