import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public url:string;

  constructor(private _http:HttpClient) { 
    this.url = global.url;
  }

  public addCart(idUser:string, productId: any):Observable<any>{
    return this._http.post<any>(this.url+'api/add-Cart/'+idUser, productId);
  }
  public updateItemOfCart(idUser:string, productId: any):Observable<any>{
    return this._http.put<any>(this.url+'api/updateItem-cart/'+idUser, productId);
  }
  public deleteItemOfCart(idUser:string, productId: any):Observable<any>{
    return this._http.put<any>(this.url+'api/deleteItem-cart/'+idUser, productId);
  }
}
