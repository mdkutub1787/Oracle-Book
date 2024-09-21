import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { AuthResponse } from '../interface/auth-response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  private baseUrl = 'http://localhost:8080'; 

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  private userRoleSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public userRole$: Observable<string | null> = this.userRoleSubject.asObservable();

  constructor(

      @Inject(PLATFORM_ID) private platformId: Object,
  
    private http: HttpClient,
    private router: Router
  ) {
    
    const storedRole = this.isBrowser() ? localStorage.getItem('userRole') : null;
    this.userRoleSubject.next(storedRole);
  }



  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/login`, { email, password }, { headers: this.headers })
      .pipe(
        map((response: AuthResponse) => {
          if (this.isBrowser() && response.token) {
            localStorage.setItem('authToken', response.token);
            const decodedToken = this.decodeToken(response.token);
            localStorage.setItem('userRole', decodedToken.role);
            this.userRoleSubject.next(decodedToken.role); 
          }
          return response;
        })
      );
  }

  register(user: { name: string; email: string; password: string; cell: string; address: string; dob: Date; gender: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`,
      user, { headers: this.headers }).pipe(
        map((response: AuthResponse) => {
          if (this.isBrowser() && response.token) {
            localStorage.setItem('authToken', response.token); // Store JWT token
          }
          return response;
        })
      );
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token'); // Safely access localStorage only in the browser
    }
    return null; // Return null if not running in the browser (SSR)
  }

  decodeToken(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'ADMIN';
  }

  isAdminOrBill(): boolean {
    const role = this.getUserRole();
    return role === 'ADMIN' || role === 'BILL';
  }

  isBILL(): boolean {
    return this.getUserRole() === 'BILL';
  }

  isUser(): boolean {
    return this.getUserRole() === 'USER';
  }

  isTokenExpired(token: string): boolean {
    const decodedToken = this.decodeToken(token);
    const expiry = decodedToken.exp * 1000; 
    return Date.now() > expiry;
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (token && !this.isTokenExpired(token)) {
      return true;
    }
    this.logout(); 
    return false;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      this.userRoleSubject.next(null); 
    }
    this.router.navigate(['/login']);
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}