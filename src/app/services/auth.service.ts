import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "https://starfish-app-g96va.ondigitalocean.app/v1/accounts";
  private transferUrl = `${this.apiUrl}/transactions/transfer/`;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth`, { email, password });
  }

  register(user: { firstName: string; lastName: string; email: string; mobilePhone: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, user);
  }

  activate(email: string, activationCode: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/activate`, { email, activationCode });
  }

  getAccounts(): Observable<any[]> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/info`, { headers });
  }

  getBalance(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('x-access-token', token || '');
    return this.http.get<any>(`${this.apiUrl}/balance`, { headers });
  }

  transferFunds(transferData: { amount: number; message: string; account: string }): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('x-access-token', token || '');
    return this.http.post(this.transferUrl, transferData, { headers });
  }

  getAccountInfo(email: string): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('x-access-token', token || '');
    return this.http.get<any>(`${this.apiUrl}/info/${email}`, { headers });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}