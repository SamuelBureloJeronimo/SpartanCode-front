import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { global } from './global';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class tokenService {
    private url: string;
    public token: string | null;

    constructor(private http: HttpClient) {
        this.url = global.url;
        this.token = localStorage.getItem('token');
    }

    public decodedToken(tokenString: string): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', tokenString);
        return this.http.get<any>(this.url + "api/validate-token", { headers });
    }
}