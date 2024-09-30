import { Injectable } from '@angular/core';
import { MarineDetailsModel } from '../model/MarineDetailsModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarinedetailsService {

  baseUrl: string = "http://localhost:8080/api/marinepolicy/";

  private exchangeRateApiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';

  private newpolicy: MarineDetailsModel[] = [];

  constructor(private http: HttpClient) { }


  getMarinedetails(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getExchangeRate(): Observable<any> {
    return this.http.get(this.exchangeRateApiUrl);
  }

  // Create a new policy
  createMarinedetails(marinelist: MarineDetailsModel): Observable<any> {
    return this.http.post(this.baseUrl + "save", marinelist);
  }

  // Delete a policy by ID
  deleteMarineList(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + "delete/" + id);
  }

  // Update a policy by ID
  updateMarineList(id: number, marinelist: MarineDetailsModel): Observable<any> {
    return this.http.put(this.baseUrl + "update/" + id, marinelist);
  }

  // Get a MarineDetails by ID
  getByMarineDetailsId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}${id}`);
  }

  // View all policies for bill (typed Observable)
  viewAllMarineListForMarineBill(): Observable<MarineDetailsModel[]> {
    return this.http.get<MarineDetailsModel[]>(this.baseUrl);
  }

  // Filter policies by policyholder, bankName, or ID  
  searchByPolicyHolderAndBankNameAndId(searchTerm: string): MarineDetailsModel[] {
    const lowerCaseSearchTerm = searchTerm.trim().toLowerCase();
    if (!lowerCaseSearchTerm) {
      return this.newpolicy;
    }

    return this.newpolicy.filter(item =>
    (item.policyholder?.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.bankName?.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.id?.toString().includes(lowerCaseSearchTerm))
    );

  }
}
