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
  public getSales_User(): Observable<any>{
    return this.http.get<any>(this.url+'api/get-sales');
  }
}
