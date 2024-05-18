import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private url:string;
  constructor(private _http:HttpClient) {
    this.url = global.url;
  }
  public createAddress(idUser:string, formData:any):Observable<any>{
    return this._http.post(this.url+'api/create-address/'+idUser, formData);
  }
  public getAddressByUser(idUser: string):Observable<any> {
    return this._http.get(this.url+"api/get-addressByUser/"+idUser);
  }
  public changeAddressDefault(idUser: string, formData: any):Observable<any> {
    return this._http.put(this.url+"api/change-addressUser/"+idUser, formData);
  }
}
