import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { ToastrService } from '../../../services/toastr.service';
import { NbDateService,  NbDialogService } from "@nebular/theme";
import { FormControl } from '@angular/forms';
import { Data, OnboardUserListResponse } from '../../../@model/reports/onboardUserList';
@Component({
  selector: 'ngx-retailers',
  templateUrl: './retailers.component.html',
  styleUrls: ['./retailers.component.scss']
})
export class RetailersComponent implements OnInit {
  formControl = new FormControl(new Date());
  ngModelDate = new Date();
  frommin: Date;
  frommax: Date;
  tomin: Date;
  tomax: Date;
  today: Date;
  loading: Boolean = false;
  searchData:any={};
  requestParam: { startDate: Date; endDate: Date, contact: String} = null;
  endpoint = "reports/onboardUserList";
  userList: Data;
  constructor(
    private http: HttpService,
    private toast: ToastrService,
    protected dateService: NbDateService<Date>,
    private dialogService: NbDialogService,
  ) {
    this.frommin = this.dateService.addMonth(this.dateService.today(), -2);
    //this.frommax = this.dateService.addDay(this.min, 15);
    this.frommax = this.dateService.today();
    this.tomin = this.dateService.today();
    this.tomax = this.dateService.today();
    this.today = this.dateService.today();
   }

  ngOnInit(): void {
  }

  setMaxdate(e) {
    const eDate = e.getFullYear() + "" + e.getMonth() + "" + e.getDate();
    const tDate =
      this.today.getFullYear() +
      "" +
      this.today.getMonth() +
      "" +
      this.today.getDate();
    this.ngModelDate = e;
    if (eDate == tDate) {
      this.tomax = this.today;
      this.tomin = this.today;
    } else {
      if (parseInt(tDate) - parseInt(eDate) >= 15) {
        this.tomax = this.dateService.addDay(e, 15);
      } else {
        this.tomax = this.today;
      }

      this.tomin = this.dateService.addDay(e, 0);
    }
    console.warn(eDate);
  }

  getRetailers(){
    let data = {
      startDate: this.formControl.value,
      endDate: this.ngModelDate,
      contact: this.searchData.contact,
    };
    this.requestParam = data;
    console.warn(data);
     
    this.loading = true;
    this.http.post(this.endpoint, this.requestParam).subscribe(
      (res: OnboardUserListResponse) => {
        if (res.response) {
          this.userList = res.data;
          console.warn(this.userList);
          this.loading = false;
        } else {
          this.toast.showToast(res.message, "Onboard User List", "warning");
          this.loading = false;
        }
      },
      (error) => {
        console.warn(error);
        this.toast.showToast(error.error.message, "Onboard User List", "danger");
        this.loading = false;
      }
    ); 
  }
   goToPage(url: string) {
    this.loading = true;
    let param = url.split("?"); 

    this.http.post(this.endpoint + "?" + param[1], this.requestParam).subscribe(
      (res: OnboardUserListResponse) => {

        if (res.response) {
          this.userList = res.data;
          console.warn(this.userList);
          this.loading = false;
        } else {
          this.toast.showToast(res.message, "Onboard User List", "warning");
        }
      },
      (error) => {
        this.toast.showToast(error.error.message, "Onboard User List", "danger");
        console.warn(error.error.message);
        this.loading = false;
      }
    );
  }
}
