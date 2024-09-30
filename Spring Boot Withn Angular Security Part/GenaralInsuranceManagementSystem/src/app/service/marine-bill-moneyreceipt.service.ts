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


  // Method to update Marine Money Receipt
  updateMarineMoneyReceipt(id: number, marineMoneyReceipt: MarineMoneyReceiptModel): Observable<any> {
    return this.http.put(this.baseUrl + "update/" + id, marineMoneyReceipt);
  }
  
  // Delete a MarineMoneyReceipt by ID
  deleteMarineMoneyReceipt(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}delete/${id}`);
  }

    // Filter receipts by policyholder, bankName, or id on the client side
    searchByPolicyHolderAndBankNameAndId(receipts: MarineMoneyReceiptModel[], searchTerm: string): MarineMoneyReceiptModel[] {
      const lowerCaseSearchTerm = searchTerm.toLowerCase(); 
  
      return receipts.filter(item =>
        ( item.issuingOffice?.toLowerCase().includes(lowerCaseSearchTerm) ||  
          item.marinebill?.marineDetails.policyholder?.toLowerCase().includes(lowerCaseSearchTerm) ||   
         item.marinebill?.marineDetails.bankName?.toLowerCase().includes(lowerCaseSearchTerm) || 
         item.marinebill?.marineDetails.id?.toString().includes(lowerCaseSearchTerm))  
      );
    }
}
