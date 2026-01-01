import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// ... inside class ...

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  // Ensure this matches your .NET API URL
  private apiUrl = environment.apiUrl;

  getUserDetail() {
    const token = this.getToken();
    if (!token) return null;
    
    // Decode the token payload
    const payload = token.split('.')[1];
    const decodedHtml = atob(payload);
    const json = JSON.parse(decodedHtml);
    
    return {
      id: json.sub,
      email: json.email,
      username: json.unique_name || json.name
    };
  }

  constructor() { }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  saveToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  getToken() {
    return localStorage.getItem('authToken');
  }

  logout() {
    localStorage.removeItem('authToken');
  }
}
