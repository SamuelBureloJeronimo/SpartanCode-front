import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { global } from './global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private url:string;
  constructor(private http: HttpClient) {
    this.url = global.url;
  }
  public create(formData: any): Observable<any>{
    return this.http.post<any>(this.url+'api/create-sale', formData);
  }
  public getSales(): Observable<any>{
    return this.http.get<any>(this.url+'api/get-sales');
  }
  public changeStatus(idSale: string): Observable<any>{
    return this.http.put<any>(this.url+'api/update-sale/'+idSale, "");
  }
  public getSalesById(idUser: string): Observable<any>{
    return this.http.get<any>(this.url+'api/get-saleByUser/'+idUser);
  }
}
