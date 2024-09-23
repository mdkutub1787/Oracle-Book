import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PolicyModel } from '../model/policy.model';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  baseUrl: string = "http://localhost:8080/api/policy/";

  private newpolicy: PolicyModel[] = []; // Array to store policies

  constructor(private http: HttpClient) { }

  // View all policies
  viewAllPolicy(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  // Create a new policy
  createPolicy(policy: PolicyModel): Observable<any> {
    return this.http.post(this.baseUrl + "save", policy);
  }

  // Delete a policy by ID
  deletePolicy(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + "delete/" + id);
  }

  // Update a policy by ID
  updatePolicy(id: number, policy: PolicyModel): Observable<any> {
    return this.http.put(this.baseUrl + "update/" + id, policy);
  }

  // Get a policy by ID
  getByPolicyId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}${id}`);
  }

  // View all policies for bill (typed Observable)
  viewAllPolicyForBill(): Observable<PolicyModel[]> {
    return this.http.get<PolicyModel[]>(this.baseUrl);
  }

  // Filter policies by policyholder or bankName on the client-side (case-insensitive, partial match)
  filterPolicyHolder(searchTerm: string): PolicyModel[] {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();  // Convert search term to lowercase

    return this.newpolicy.filter(item =>
      (item.policyholder?.toLowerCase().includes(lowerCaseSearchTerm) ||   // Match against policyholder
      item.bankName?.toLowerCase().includes(lowerCaseSearchTerm))          // Match against bankName
    );
  }

  // Sort policies by 'bankName' or 'policyholder' on the client-side
  sortPolicy(by: 'bankName' | 'policyholder'): PolicyModel[] {
    return this.newpolicy.sort((a, b) => {
      const valueA = a[by]?.toLowerCase() ?? '';  
      const valueB = b[by]?.toLowerCase() ?? '';
  
      if (valueA < valueB) return -1;
      if (valueA > valueB) return 1;
      return 0;
    });
  }
}
