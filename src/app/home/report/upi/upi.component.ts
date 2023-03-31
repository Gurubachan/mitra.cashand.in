import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable, of } from "rxjs";
import { Data, UpiResponse } from "../../../@model/upi/upiResponse";
import { HttpService } from "../../../services/http.service";
import { ToastrService } from "../../../services/toastr.service";
import { NbDateService } from "@nebular/theme";
import { map, startWith } from "rxjs/operators";
import { UPIRequest } from "../../../@model/upi/upiRequest";
import { error } from "console";
import { fakeAsync } from "@angular/core/testing";
import { PublicApiCallService } from "../../../services/public-api-call.service";
@Component({
  selector: "ngx-upi",
  templateUrl: "./upi.component.html",
  styleUrls: ["./upi.component.scss"],
})
export class UpiComponent implements OnInit {
  upi: Data;
  loading: boolean = false;
  permiteMISRole=[9,10,14,15];
  user:any=null
  searchData:UPIRequest
  formControl = new FormControl(new Date());
  ngModelDate = new Date();
  frommin: Date;
  frommax: Date;
  tomin: Date;
  tomax: Date;
  today: Date;

  options: string[];
  filteredOptions$: Observable<string[]>;
  inputFormControl: FormControl;

  constructor(private http: HttpService, 
    private toast: ToastrService, 
    protected dateService: NbDateService<Date>,
    private cd: ChangeDetectorRef,
    private commonApi:PublicApiCallService
    ) {
    this.frommin = this.dateService.addMonth(this.dateService.today(), -2);
    //this.frommax = this.dateService.addDay(this.min, 15);
    this.frommax = this.dateService.today();
    this.tomin = this.dateService.today();
    this.tomax = this.dateService.today();
    this.today = this.dateService.today();
  }

  ngOnInit(): void {
     this.getUserData() 

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

  getTransaction() {
    this.loading = true;
    let data = {
      fromDate: this.formControl.value,
      toDate: this.ngModelDate,
      userId: null,
    };
    if(this.inputFormControl.value !=null && this.inputFormControl.value.length > 10 ){
      console.warn(this.inputFormControl.value);
      let contact=this.inputFormControl.value.split("-");
      data.userId= contact[0];
    }else{
      data.userId=null;
    }
    this.searchData = data;
    this.http.post("upi/transaction", this.searchData).subscribe(
      (res: UpiResponse) => {
        if (res.response) {
          this.upi = res.data;
          this.loading = false;
        } else {
          this.toast.showToast(res.message, "UPI", "warning");
          this.loading = false;
        }
      },
      (err: any) => {
        this.toast.showToast(err.error.message, "UPI", "danger");
        this.loading = false;
      }
    );
  }

  goToPage(url: string) {
    this.loading = true;
    let param = url.split("?");
    
    let endpoint;

    endpoint = "upi/transaction";

    this.http.post(endpoint + "?" + param[1], this.searchData).subscribe(
      (res: any) => {
        if (res.response) {
          this.upi = res.data;
          this.loading = false;
        } else {
          this.toast.showToast(res.message, "UPI", "warning");
        }
      },
      (error) => {
        console.warn(error.error.message);
        this.loading = false;
      }
    );
  }

  getUserData() {
    this.user = JSON.parse(window.atob(localStorage.getItem("user")));
    console.log(this.user);
  }

  filterUser(e){
 if (e != null && e.length >= 4 && e.length<=10){
      this.commonApi.filterUser(e).then((userList)=>{
        console.warn("Filter", userList);
        this.options=userList;
        this.cd.detectChanges();
      }
    );
  }

  }

  reconcile(e) { 
    this.loading = true;
      this.http.post("upi/reconcile",{transactionId:e.id}).subscribe(response => {
        if(response.response){
          for(var i=0;i<this.upi.data.length;i++){
            if(e.id == this.upi.data[i].id){
              this.upi.data[i].walletReferenceNo=response.data.id;
              break
            }
          }
          this.loading = false;
        }else{
          this.toast.showToast(response.message,"UPI Transaction","error")
          this.loading = false;

        }
      })
  }          

  
}
