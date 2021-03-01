import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import {
  getDeepFromObject,
  NbAuthResult,
  NbAuthService,
  NbAuthToken,
  NB_AUTH_OPTIONS,
} from '@nebular/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  token: NbAuthToken;
  redirectDelay: number = 0;
  strategy: string = '';

  constructor(
    private http: HttpClient,
    private authService: NbAuthService,
    private router: Router,
    @Inject(NB_AUTH_OPTIONS) protected options = {}
  ) {
    this.authService.onTokenChange().subscribe((token: NbAuthToken) => {
      if (token && token.isValid()) {
        this.token = token;
      }
    });
  }

  get(serviceName: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    });
    /*
    console.warn("token : " + this.token);
    */
    const options = { headers: headers, withCredintials: false };
    const url = environment.uri + serviceName;

    return this.http.get(url, options);
  }

  post(serviceName: string, data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    });

    const options = { headers: headers, withCredintials: false };
    const url = environment.uri + serviceName;

    return this.http.post(url, JSON.stringify(data), options);
  }

  put(serviceName: string, data: any): Observable<any> {
   // console.warn("token else fetched:" + this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    });

    const options = { headers: headers, withCredintials: false };
    const url = environment.uri + serviceName;

    return this.http.put(url, JSON.stringify(data), options);
  }

  delete(serviceName: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    });

    const options = { headers: headers, withCredintials: false };
    const url = environment.uri + serviceName;

    return this.http.delete(url, options);
  }

  isLoggedIn() {
    return this.authService.isAuthenticated();
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
