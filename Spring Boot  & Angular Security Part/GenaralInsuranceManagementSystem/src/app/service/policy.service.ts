import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PolicyModel } from '../model/policy.model';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  baseUrl: string = "http://localhost:8080/api/policy/";

  private newpolicy: PolicyModel[] = []; 

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

  // Filter policies by policyholder or bankName on the client-side 
 searchByPolicyHolderAndBankName(searchTerm: string): PolicyModel[] {
    const lowerCaseSearchTerm = searchTerm.toLowerCase(); 

    return this.newpolicy.filter(item =>
      (item.policyholder?.toLowerCase().includes(lowerCaseSearchTerm) ||   
      item.bankName?.toLowerCase().includes(lowerCaseSearchTerm))     
    );
  }


}
