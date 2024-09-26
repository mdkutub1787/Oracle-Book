import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ReceiptModel } from '../model/receipt.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {
  private baseUrl: string = "http://localhost:8080/api/receipt/";

  constructor(private http: HttpClient) { }

  getAllReceipt(): Observable<ReceiptModel[]> {
    return this.http.get<ReceiptModel[]>(this.baseUrl).pipe(
      catchError(error => {
        console.error('Error fetching receipts:', error);
        return of([]); 
      })
    );
  }

  getReceiptById(id: number): Observable<ReceiptModel> {
    return this.http.get<ReceiptModel>(`${this.baseUrl}${id}`).pipe(
      catchError(error => {
        console.error(`Error fetching receipt with id ${id}:`, error);
        return of({} as ReceiptModel); // Return an empty object on error
      })
    );
  }

  createReceipt(receipt: ReceiptModel): Observable<ReceiptModel> {
    return this.http.post<ReceiptModel>(`${this.baseUrl}save`, receipt);
  }

  deleteReceipt(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}delete/${id}`);
  }

  // Filter receipts by policyholder, bankName, or id on the client side
  searchByPolicyHolderAndBankNameAndId(receipts: ReceiptModel[], searchTerm: string): ReceiptModel[] {
    const lowerCaseSearchTerm = searchTerm.toLowerCase(); 

    return receipts.filter(item =>
      (item.bill?.policy.policyholder?.toLowerCase().includes(lowerCaseSearchTerm) ||   
       item.bill?.policy.bankName?.toLowerCase().includes(lowerCaseSearchTerm) || 
       item.bill?.policy.id?.toString().includes(lowerCaseSearchTerm))  
    );
  }
}
