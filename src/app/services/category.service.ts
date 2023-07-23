import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url:string;
  constructor(private _http:HttpClient) { 
    this.url = global.url;
  }

  public getCategories():Observable<any>{
    return this._http.get<any>(this.url+'api/get-categories');
  }

  public getCategorie(_id:string):Observable<any>{
    return this._http.get<any>(this.url+'api/get-category/'+_id);
  }

  public createCategory(formData:any):Observable<any>{
    return this._http.post<any>(this.url+'api/create-category',formData);
  }

  public updateCategory(formData:any,_id:string):Observable<any>{
    return this._http.put<any>(this.url+'api/update-category/'+_id,formData);
  }

  public deteleCategory(_id:string):Observable<any>{
    return this._http.delete<any>(this.url+'api/delete-category/'+_id);
  }
}
