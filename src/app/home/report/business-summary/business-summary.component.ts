import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BusinessSummary, BusinessSummaryResponse } from '../../../@model/reports/businessSummaryResponse';
import { HttpService } from '../../../services/http.service';
import { ToastrService } from '../../../services/toastr.service';
import { NbDateService,  NbDialogService } from "@nebular/theme";
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
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

  permiteMISRole=[9,10,14,15];
   user:any=null;
   options: string[];
     filteredOptions$: Observable<string[]>;
     inputFormControl: FormControl;
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
    this.getUserData();
     this.options = [];
    this.filteredOptions$ = of(this.options);

    this.inputFormControl = new FormControl();

    this.filteredOptions$ = this.inputFormControl.valueChanges.pipe(
      startWith(""),
      map((filterString) => this.filter(filterString))
    );
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((optionValue) =>
      optionValue.toLowerCase().includes(filterValue)
    );
  }
  viewHandle(value: string) {
    return value.toUpperCase();
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
      userId: null,
    };
    this.requestParam = data;

    this.loading = true;

    if(this.inputFormControl.value !=null && this.inputFormControl.value.length > 10 ){
      console.warn(this.inputFormControl.value);
      let contact=this.inputFormControl.value.split("-");
      data.userId= contact[0];
    }else{
      
        data.userId=null;
      
      
    }

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

  filterUser(e){
    this.options=[];
       if (e != null && e.length >= 4 && e.length<=10){
         this.http.post('admin/filterUser',{value:e}).subscribe((result) => {
           
           if(result.response){
            this.options=[];
             result.data.forEach(u => {
               let name=u.fname+' '+u.lname;
               this.options.push(u.contact+'-'+name);
             });
           }
         });
        /*  let result=this.apiCall.getRetailer(e);
         console.log(result) */
        
       }
   
     }

  increment(value: number) {
    return (value = value + 1);
  }

  getUserData() {
    this.user = JSON.parse(window.atob(localStorage.getItem("user")));
    console.log(this.user);
  }

}
