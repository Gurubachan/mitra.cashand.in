import { Injectable } from '@angular/core';
import {HttpService} from './http.service';


@Injectable({
  providedIn: 'root',
})
export class PublicApiCallService {

  constructor(private http: HttpService) { }

  getState() {
    this.http.get('state')
      .subscribe((result) => {
        return result;
      });
  }
}
