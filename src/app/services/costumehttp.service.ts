import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CostumehttpService {

  constructor(
    private http: HttpClient,
  ) { }

  post(url: string,passkey: any, data: any): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + passkey,
    });
    const options = { headers: headers, withCredintials: false };

    return this.http.post(url, JSON.stringify(data), options);
  }

  get(url: string,passkey: any): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + passkey,
    });
    const options = { headers: headers, withCredintials: false };

    return this.http.get(url, options);
  }
  
}
