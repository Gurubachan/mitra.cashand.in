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

   getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (resp) => {
          resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
        },
        (err) => {
          reject(err);
        },
      );
    });
  }

  filterUser(filter:any): Promise<any> {
    let listUser=[];
    return new Promise<any>((resolve, reject) => {
       
      this.http.post('admin/filterUser',{value:filter}).subscribe((result) => {
        result.data.forEach(u => {
            let name=u.fname+' '+u.mname+' '+u.lname;
            listUser.push(u.contact+'-'+name.replace(null,'').trim());
          });
        resolve( listUser);
      },(err)=>{
        reject(listUser)
      });
    
    });
  }
}
