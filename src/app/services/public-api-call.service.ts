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

  getRetailer(data: string) {
    if(data.length>=3){
      this.http.post('admin/filterUser',{value:data}).subscribe((result) => {
        return result;
      });
    }
    
  }
}
