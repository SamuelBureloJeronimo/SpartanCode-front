import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class productService {
  private url:string;

  constructor(private http: HttpClient) { 
    this.url = global.url;
  }


  public getData(): Observable<any>{
    return this.http.get<any>(this.url+'api/get-products');
  }

  public getProduct(_id:string):Observable<any>{
    return this.http.get<any>(this.url+'api/get-product/'+_id);
  }

  public createProduct(formData: any):Observable<any>{
    return this.http.post(this.url+'api/create-product', formData);
  }

  public updateProduct(id: string, formData: any):Observable<any> {
    return this.http.put(this.url+'api/update-product/'+id, formData);
  }

  public searchProduct(name:any):Observable<any>{
    return this.http.get<any>(this.url+'api/search-product/'+name);
  }

  public deleteProduct(id:string):Observable<any>{
    return this.http.delete<any>(this.url+'api/delete-product/'+id);
  }
}
