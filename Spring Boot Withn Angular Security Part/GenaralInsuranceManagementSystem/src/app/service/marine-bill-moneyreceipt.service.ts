import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MarineMoneyReceiptModel } from '../model/MarineMoneyReceipt.Model';

@Injectable({
  providedIn: 'root'
})
export class MarineBillMoneyreceiptService {

  private baseUrl: string = "http://localhost:8080/api/marinemoneyreceipt/";

  constructor(private http: HttpClient) { }

  // Fetch all MarineMoneyReceipts
  getMarineMoneyReceipts(): Observable<MarineMoneyReceiptModel[]> {
    return this.http.get<MarineMoneyReceiptModel[]>(this.baseUrl);
  }

  // Fetch a single MarineMoneyReceipt by ID
  getMarineMoneyReceiptById(marinebillId: number): Observable<MarineMoneyReceiptModel> {
    return this.http.get<MarineMoneyReceiptModel>(`${this.baseUrl}${marinebillId}`);
  }

  // Create a new MarineMoneyReceipt
  createMarineMoneyReceipt(marinebill: MarineMoneyReceiptModel): Observable<any> {
    return this.http.post(this.baseUrl + "save", marinebill);
  }

  // Update an existing MarineMoneyReceipt by ID
  updateMarineMoneyReceipt(id: number, marinebill: MarineMoneyReceiptModel): Observable<any> {
    return this.http.put(`${this.baseUrl}update/${id}`, marinebill);
  }

  // Delete a MarineMoneyReceipt by ID
  deleteMarineMoneyReceipt(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}delete/${id}`);
  }
}
