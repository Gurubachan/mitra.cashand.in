import { Component, OnInit } from "@angular/core";
import {
  Data,
  SettlementResponse,
} from "../../../@model/walletSettlement/cashoutResponse";
import { HttpService } from "../../../services/http.service";
import { ToastrService } from "../../../services/toastr.service";
import { FormControl } from "@angular/forms";
import { Observable, of } from "rxjs";
import { NbDateService } from "@nebular/theme";
import { PublicApiCallService } from "../../../services/public-api-call.service";
import { map, startWith } from "rxjs/operators";
@Component({
  selector: "ngx-cashout",
  templateUrl: "./cashout.component.html",
  styleUrls: ["./cashout.component.scss"],
})
export class CashoutComponent implements OnInit {
  settlement: Data = null;
  loading: Boolean = false;

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
  permiteMISRole=[9,10,14,15];
  user:any=null;
  requestParam: { startDate: Date; endDate: Date } = null;
  endpoint = "wallet/cashout";
  constructor(private http: HttpService, 
    private toast: ToastrService,  
    protected dateService: NbDateService<Date>, 
    private commonApi: PublicApiCallService) {

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

  filterUser(e){
  if (e != null && e.length >= 4 && e.length<=10){
      this.commonApi.filterUser(e).then((userList)=>{
        //console.warn("Filter", userList);
        this.options=userList;
      });
    }
  }

  myCashout() {
    this.loading = true;
    let data = {
      startDate: this.formControl.value,
      endDate: this.ngModelDate,
      userId: null,
    };

    if(this.inputFormControl.value !=null && this.inputFormControl.value.length > 10 ){
      console.warn(this.inputFormControl.value);
      let contact=this.inputFormControl.value.split("-");
      data.userId= contact[0];
    }else{
      data.userId=null;
    }
   this.requestParam = data;
    this.http.post(this.endpoint, data).subscribe(
      (res: SettlementResponse) => {
        if (res.response) {
          this.settlement = res.data;
          console.warn(this.settlement);
          this.loading = false;
        } else {
          this.toast.showToast(res.message, "Settlemet", "warning");
          this.loading = false;
        }
      },
      (error) => {
        console.warn(error);
        this.toast.showToast(error.error.message, "Settlemet", "danger");
        this.loading = false;
      }
    );
  }

  goToPage(url: string) {
    this.loading = true;
    let param = url.split("?");
    //console.log(param);
    /* let data = {
      startDate: this.formControl.value,
      endDate: this.ngModelDate,
      type: this.selectedTxnType,
      status: this.selectedTxnStatus,
    }; */
    

    this.http.post(this.endpoint + "?" + param[1], this.requestParam).subscribe(
      (res: SettlementResponse) => {
        if (res.response) {
          this.settlement = res.data;
          console.warn(this.settlement);
          this.loading = false;
        } else {
          this.toast.showToast(res.message, "Settlement", "warning");
        }
      },
      (error) => {
        this.toast.showToast(error.error.message, "Settlemet", "danger");
        console.warn(error.error.message);
        this.loading = false;
      }
    );
  }

  /* check(id) {
    this.loading = true;
    this.http.post("wallet/getPayout", { merchant_ref_id: id }).subscribe(
      (response) => {
        if (response.response) {
          for (let index = 0; index < this.settlement.data.length; index++) {
            if (this.settlement.data[index].id === id) {
              this.settlement.data[index].status = response.data.status;
              this.settlement.data[index].remark = response.data.remark;
              this.settlement.data[index].updated_at = response.data.updated_at;
              this.settlement.data[index].description =
                response.data.description;
            }
          }
        }
        console.log(response);
        this.loading = false;
      },
      (err) => {
        this.loading = false;
      }
    );
  } */

   getUserData() {
    this.user = JSON.parse(window.atob(localStorage.getItem("user")));
    console.log(this.user);
  }
}
