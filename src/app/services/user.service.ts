import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})

export class userService 
{
  public url:string;
  constructor(private _http:HttpClient) { 
    this.url = global.url;
  }

  public createUser(formData:any):Observable<any>{
    return this._http.post(this.url+'api/create-user', formData);
  }

  public loginUser(formData: any): Observable<any>{
    return this._http.post(this.url+'api/login', formData);
  }

  public getUser(id:string): Observable <any>{
    return this._http.get(this.url+'api/get-user/'+id);
  }

  public getUsers(){
    this._http.get(this.url+'api/get-users').subscribe(data => {
      console.log(data);
    });
  }
  public updateUser(id:string, formData: any):Observable<any>{
    return this._http.put(this.url+'api/edit-user/'+id, formData);
  }

}