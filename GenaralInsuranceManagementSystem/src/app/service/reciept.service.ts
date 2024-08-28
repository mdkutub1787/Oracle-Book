import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReceiptModel } from '../model/reciept.model';

@Injectable({
  providedIn: 'root'
})
export class RecieptService {

  baseUrl: string = "http://localhost:3000/reciept/";

  constructor(private http: HttpClient) { }

  getAllReciept(): Observable<any> {
    return this.http.get(this.baseUrl)
  }

  createReciept(reciept: ReceiptModel): Observable<ReceiptModel> {
    return this.http.post<ReceiptModel>(this.baseUrl, reciept);
  }
}
