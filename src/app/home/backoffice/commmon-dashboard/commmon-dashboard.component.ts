import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { ToastrService } from '../../../services/toastr.service';
import { Data, ServiceWiseBusinessResponse } from '../../../@model/wallet/ServiceWiseBusinessResponse';
@Component({
  selector: 'ngx-commmon-dashboard',
  templateUrl: './commmon-dashboard.component.html',
  styleUrls: ['./commmon-dashboard.component.scss']
})
export class CommmonDashboardComponent implements OnInit {
isLoading = false;
serviceWiseBusiness:Data[]=null;
loadingMessage: string = '';
  constructor(private http: HttpService, private cd: ChangeDetectorRef, private toast: ToastrService) { }

  ngOnInit(): void {
    this.loadServiceWiseBusiness();
  }
  

  loadServiceWiseBusiness(){
    this.isLoading=true;
    this.loadingMessage="Fetching Data...";
    let d = new Date();
    let month=d.getMonth()+1;
    let currentDate = d.getDate()+"-"+month+"-"+d.getFullYear();
    let param={
      "startDate":currentDate,
      "endDate":currentDate
    };
    this.http.post("reports/dailyBusiness",param).subscribe((res:ServiceWiseBusinessResponse) => {
      if(res.response){
        this.serviceWiseBusiness=res.data;
        this.isLoading=false;
        this.cd.detectChanges();
      }else{
        this.isLoading=false;
        this.cd.detectChanges();
      }
    })
  }
}
