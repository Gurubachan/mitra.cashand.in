import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { admin } from "../../../constants/admin";
import { HttpService } from '../../../services/http.service';
import { ToastrService } from '../../../services/toastr.service';
import { NbDialogService } from "@nebular/theme";
import { Commission, CommissionResponse } from '../../../@model/commission/CommissionResponse';
@Component({
  selector: 'ngx-commission-revision',
  templateUrl: './commission-revision.component.html',
  styleUrls: ['./commission-revision.component.scss']
})
export class CommissionRevisionComponent implements OnInit {
filterData: any = {
    key: String,
    value: String,
  };
  searchData: any = {};
  submitted: boolean = false;
  loading: boolean = false;
  minError: boolean = false;
  maxError: boolean = false;
  
  commission:Commission[]=[];
  user:number;

  constructor(
    private http: HttpService,
    private dialog: NbDialogService,
    private toast: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
     let user = JSON.parse(window.atob(localStorage.getItem("user")));
    if (admin.adminGroup.indexOf(user.role) > -1) {
      this.filterData.key = "role";
      this.filterData.value = "4";
      //this.getCommission()
    } else {
      this.toast.showToast(
        "You are not authorised to access this url 😒 !",
        "Wrong Route",
        "warning"
      );
      this.router.navigateByUrl("/dashboard");
    }
  }

  getCommission(){
    this.http.post("reports/commission",this.searchData ).subscribe((res: CommissionResponse) => {
      if(res.response){
        this.commission=res.data.commission;
        this.user=res.data.user;
      }
    });
  }
  onFormSubmit(t) {
    console.log(t.reviseCommission);
    
       if(parseFloat(t.reviseCommission)>parseFloat(t.maxCommission) ){
              this.maxError=true;
          }else{
            this.maxError=false;
          }
          if(parseFloat(t.reviseCommission)<parseFloat(t.minCommission) ){
              this.minError=true;
          }else{
            this.minError =false; 
          }

          if(!this.maxError && !this.minError){
            let postData={
              'userId':this.user,
              'commissionId':t.id,
              'revisedAmount':t.reviseCommission,
              'isPercentage':t.isPercentage
            };
              this.http.post("admin/commissionAssign",postData).subscribe(res =>{
                console.log(res);
              });
          }
  }

  increment(value: number) {
    return (value = value + 1);
  }

}
