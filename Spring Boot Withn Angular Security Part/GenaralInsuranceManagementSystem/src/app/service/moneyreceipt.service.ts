import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MoneyReceiptModel } from '../model/moneyreceipt.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoneyreceiptService {

  baseUrl: string = "http://localhost:8080/api/moneyreceipt/";

  constructor(private http: HttpClient) { }

  getAllMoneyReceipt(): Observable<MoneyReceiptModel[]> {
    return this.http.get<MoneyReceiptModel[]>(this.baseUrl)
  }

  getMoneyReceiptById(id: number): Observable<MoneyReceiptModel> {
    return this.http.get<MoneyReceiptModel>(this.baseUrl + id)
  }
  createMoneyReceipt(moneyreciept: MoneyReceiptModel): Observable<MoneyReceiptModel> {
    return this.http.post<MoneyReceiptModel>(this.baseUrl + "save", moneyreciept);
  }

  
  deleteMoneyReceipt(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}delete/${id}`);
  }

  updateMoneyReceipt(id: number, moneyreciept: MoneyReceiptModel): Observable<any> {
    return this.http.put(this.baseUrl + "update/" + id, moneyreciept);
  }

  // Filter receipts by policyholder, bankName, or id on the client side
  searchByPolicyHolderAndBankNameAndId(receipts: MoneyReceiptModel[], searchTerm: string): MoneyReceiptModel[] {
    const lowerCaseSearchTerm = searchTerm.toLowerCase(); 

    return receipts.filter(item =>
      (item.bill?.policy.policyholder?.toLowerCase().includes(lowerCaseSearchTerm) ||   
       item.bill?.policy.bankName?.toLowerCase().includes(lowerCaseSearchTerm) || 
       item.bill?.policy.id?.toString().includes(lowerCaseSearchTerm))  
    );
  }

}
