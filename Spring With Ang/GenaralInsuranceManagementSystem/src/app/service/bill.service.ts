import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { BillModel } from '../model/bill.model';
import { PolicyModel } from '../model/policy.model';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  baseUrl: string = "http://localhost:8080/api/bill/";

  constructor(private http: HttpClient) {}

  viewAllBill(): Observable<BillModel[]> {
    return this.http.get<BillModel[]>(this.baseUrl);
  }

  getAllBillForReceipt(): Observable<BillModel[]> {
    return this.http.get<BillModel[]>(this.baseUrl)
     
  }
  getAllBillForMoneyReceipt(): Observable<BillModel[]> {
    return this.http.get<BillModel[]>(this.baseUrl)
     
  }

  createBill(bills: BillModel): Observable<BillModel> {
    return this.http.post<BillModel>(this.baseUrl+"save", bills);
  }

  deleteBill(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + "delete/" + id);
  }

  updateBill(id: number, bill: BillModel): Observable<BillModel> {
    return this.http.put<BillModel>(this.baseUrl + "update/" + id, bill);
  }
  

  getByBillId(billId: number): Observable<BillModel> {
    return this.http.get<BillModel>(`${this.baseUrl}${billId}`);
  }

  // searchByPolicyHolder(policyholder: string): Observable<PolicyModel[]> {
  //   return this.http.get<PolicyModel[]>(this.baseUrl + "/searchpolicyholder?policyholder=" + policyholder);
  // }
  
  searchByPolicyHolder(policyholder: string): Observable<PolicyModel[]> {
    return this.http.get<PolicyModel[]>(`search?policyholder=${policyholder}`);
  }
  
  
  
}
