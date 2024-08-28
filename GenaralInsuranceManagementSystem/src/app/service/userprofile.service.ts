import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../model/user.model';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserprofileService {

  private baseUrl = 'http://localhost:3000/user';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  // Get the user profile from storage
  getUserProfile(): Observable<UserModel | null> {
    return of(this.authService.getUserProfileFromStorage());
  }

  // Get all user data
  getData(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  // Search users by criteria
  searchUsers(criteria: string, value: string): Observable<UserModel[]> {
    const params = new HttpParams().set(criteria, value);
    return this.http.get<UserModel[]>(this.baseUrl, { params });
  }

}
