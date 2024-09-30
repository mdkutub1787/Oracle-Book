import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MarineBillModel } from '../model/MarineBill.Model';

@Injectable({
  providedIn: 'root'
})
export class MarinebillService {

  baseUrl: string = "http://localhost:8080/api/marinebill/";


  constructor(private http: HttpClient) { }

  
  getMarineBill(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  createMarineBill(marinebill: MarineBillModel): Observable<any> {
    return this.http.post(this.baseUrl + "save", marinebill);
  }

 
  deleteMarineBill(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + "delete/" + id);
  }

  
  updateMarineBill(id: number, marinebill: MarineBillModel): Observable<any> {
    return this.http.put(this.baseUrl + "update/" + id, marinebill);
  }


  getByMarineBillId(marinebillId: number): Observable<MarineBillModel> {
    return this.http.get<MarineBillModel>(`${this.baseUrl}${marinebillId}`);
  }

  getAllMaeineBillForMoneyReceipt(): Observable<MarineBillModel[]> {
    return this.http.get<MarineBillModel[]>(this.baseUrl)
     
  }

  
  searchByPolicyHolderAndBankNameAndId(marinebill: MarineBillModel[], searchTerm: string): MarineBillModel[] {
    const lowerCaseSearchTerm = searchTerm.toLowerCase(); 

    return marinebill.filter(item =>
      (item.marineDetails.policyholder?.toLowerCase().includes(lowerCaseSearchTerm) ||   
       item.marineDetails.bankName?.toLowerCase().includes(lowerCaseSearchTerm) || 
       item.marineDetails.id?.toString().includes(lowerCaseSearchTerm))  
    );
  }
  
}
