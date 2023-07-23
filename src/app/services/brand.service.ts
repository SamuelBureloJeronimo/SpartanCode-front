import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { global } from './global';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private url:string;

  constructor(private _http:HttpClient) {
    this.url = global.url;
  }

  public getBrands():Observable<any>{
    return this._http.get<any>(this.url+'api/get-brands');
  }

  public createBrand(formdata: any):Observable<any>{
    return this._http.post<any>(this.url+'api/create-brand', formdata);
  }

  public getBrand(_id:string):Observable<any>{
    return this._http.get<any>(this.url+'api/get-brand/'+_id);
  }

  public deteteBrand(_id:string):Observable<any>{
    return this._http.delete<any>(this.url+'api/delete-brand/'+_id);
  }

  public updateBrand(formData:any,_id:string):Observable<any>{
    return this._http.put<any>(this.url+'api/update-brand/'+_id,formData);
  }

}
