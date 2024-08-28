import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { PolicyModel } from '../model/policy.model';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  baseUrl: string = "http://localhost:3000/policy";

  constructor(private http: HttpClient) { }

  // View all policies
  viewAllPolicy(): Observable<any> {
    return this.http.get(this.baseUrl)
      .pipe(
        catchError(this.handleError) // Handle error globally
      );
  }

  // View all policies with typing
  viewAllPolicyForBill(): Observable<PolicyModel[]> {
    return this.http.get<PolicyModel[]>(this.baseUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Create a new policy
  createPolicy(policy: PolicyModel): Observable<any> {
    return this.http.post(this.baseUrl, policy)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Delete a policy by ID
  deletePolicy(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Update a policy by ID
  updatePolicy(id: string, policy: PolicyModel): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, policy)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get a policy by ID
  getByPolicyId(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Search policies by criteria
  searchPolicies(criteria: string, value: string): Observable<PolicyModel[]> {
    const params = new HttpParams().set(criteria, value);
    return this.http.get<PolicyModel[]>(this.baseUrl, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get all policies
  getAllPolicies(): Observable<PolicyModel[]> {
    return this.http.get<PolicyModel[]>(this.baseUrl);
  }

  // Error handling
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
