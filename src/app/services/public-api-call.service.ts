import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  getRetailer(data: string) :Observable<any>{
    let response=null;
    if(data.length>=3){
      this.http.post('admin/filterUser',{value:data}).subscribe((result) => {
        return response=result;
      });
    }
    return response;
    
  }
}
