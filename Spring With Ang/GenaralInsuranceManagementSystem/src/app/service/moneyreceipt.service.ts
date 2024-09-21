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
  createReceipt(moneyreciept: MoneyReceiptModel): Observable<MoneyReceiptModel> {
    return this.http.post<MoneyReceiptModel>(this.baseUrl + "save", moneyreciept);
  }
}
