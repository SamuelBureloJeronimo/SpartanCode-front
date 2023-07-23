import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})

export class postalCodeService {
    public url:string;
    constructor(private _http:HttpClient) { 
        this.url = global.url;
    }

    public getColonias(cp:string): Observable<any>{
        return this._http.get(this.url+'api/get-axios/'+cp);
    }
    public getMunicipios(State:string): Observable<any> {
        return this._http.get(this.url+'api/get-municipios/'+State);
    }
}