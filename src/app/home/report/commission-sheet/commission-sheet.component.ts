import { Component, OnInit } from '@angular/core';
import { CommissionResponse, Data } from '../../../@model/commission/CommissionResponse';
import { HttpService } from '../../../services/http.service';
import { ToastrService } from '../../../services/toastr.service';

@Component({
  selector: 'ngx-commission-sheet',
  templateUrl: './commission-sheet.component.html',
  styleUrls: ['./commission-sheet.component.scss']
})
export class CommissionSheetComponent implements OnInit {
  commission: Data
  loading:boolean=false
  constructor(private http: HttpService, private toast: ToastrService,) { }

  ngOnInit(): void {
    this.getCommission();
  }

  getCommission(){
    this.loading=true;
    this.http.post("reports/myCommission",{}).subscribe((res:CommissionResponse)=>{
      if(res.response){
        this.commission=res.data
      }else{
        this.toast.showToast(res.message,"Commission","danger");
      }
    },(err:any)=>{
      this.toast.showToast(err.error.message,"Commission","danger");
    })
    this.loading=false;
  }

}
