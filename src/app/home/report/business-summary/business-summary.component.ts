import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BusinessSummary, BusinessSummaryResponse } from '../../../@model/reports/businessSummaryResponse';
import { HttpService } from '../../../services/http.service';
import { ToastrService } from '../../../services/toastr.service';
import { NbDateService,  NbDialogService } from "@nebular/theme";
@Component({
  selector: 'ngx-business-summary',
  templateUrl: './business-summary.component.html',
  styleUrls: ['./business-summary.component.scss']
})
export class BusinessSummaryComponent implements OnInit {

   formControl = new FormControl(new Date());
  ngModelDate = new Date();
  frommin: Date;
  frommax: Date;
  tomin: Date;
  tomax: Date;
  today: Date;
  loading: Boolean = false;
  requestParam: { startDate: Date; endDate: Date } = null;
  endpoint = "reports/userBusiness";
  summary: BusinessSummary[];
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
  myTransaction(){}

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
    };
    this.requestParam = data;

    this.loading = true;
    this.http.post(this.endpoint, this.requestParam).subscribe(
      (res: BusinessSummaryResponse) => {
        if (res.response) {
          this.summary = res.data;
          console.warn(this.summary);
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
      (res: BusinessSummaryResponse) => {

        if (res.response) {
          this.summary = res.data;
          console.warn(this.summary);
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

  increment(value: number) {
    return (value = value + 1);
  }

}
