import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ReceiptModel } from '../model/receipt.model';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  baseUrl: string = "http://localhost:8080/api/receipt/";

  constructor(private http: HttpClient) { }

  getAllReceipt(): Observable<ReceiptModel[]> {
    return this.http.get<ReceiptModel[]>(this.baseUrl)
  }

  getReceiptById(id: number): Observable<ReceiptModel> {
    return this.http.get<ReceiptModel>(this.baseUrl + id)
  }

  createReceipt(reciept: ReceiptModel): Observable<ReceiptModel> {
    return this.http.post<ReceiptModel>(this.baseUrl + "save", reciept);
  }
  

  deleteReceipt(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}delete/${id}`);
  }


 
  
}
