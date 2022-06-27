import { Component, OnInit } from "@angular/core";
import {
  RechargeResponse,
  Data,
} from "../../../@model/recharge/rechargeResponse";
import { HttpService } from "../../../services/http.service";
import { ToastrService } from "../../../services/toastr.service";
import { NbDateService,  NbDialogService } from "@nebular/theme";
import { FormControl } from "@angular/forms";
import { Observable, of } from "rxjs";
import { map, startWith } from "rxjs/operators";
@Component({
  selector: "ngx-recharge",
  templateUrl: "./recharge.component.html",
  styleUrls: ["./recharge.component.scss"],
})
export class RechargeComponent implements OnInit {
  myRecharge: Data = null;
  loading: Boolean = false;
  user: any = null;

  formControl = new FormControl(new Date());
  ngModelDate = new Date();
  frommin: Date;
  frommax: Date;
  tomin: Date;
  tomax: Date;
  today: Date;

  requestParam: { startDate: Date; endDate: Date } = null;

  options: string[];
  filteredOptions$: Observable<string[]>;
  inputFormControl: FormControl;
  constructor(private http: HttpService, private toast: ToastrService, protected dateService: NbDateService<Date>,) {
     this.frommin = this.dateService.addMonth(this.dateService.today(), -2);
    //this.frommax = this.dateService.addDay(this.min, 15);
    this.frommax = this.dateService.today();
    this.tomin = this.dateService.today();
    this.tomax = this.dateService.today();
    this.today = this.dateService.today();
  }

  ngOnInit(): void {
   
    this.getUserData();
     this.options = ["Option 1", "Option 2", "Option 3"];
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

  getRecharge() {
    let data = {
      startDate: this.formControl.value,
      endDate: this.ngModelDate,
    };
    this.requestParam = data;

    this.loading = true;
    this.http.post("recharge/myTransaction", this.requestParam).subscribe(
      (res: RechargeResponse) => {
        if (res.response) {
          this.myRecharge = res.data;
        } else {
          this.toast.showToast(res.message, "Recharge", "warning");
        }
        this.loading = false;
      },
      (error) => {
        console.warn(error.error.message);
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
    let endpoint;

    endpoint = "recharge/myTransaction";

    this.http.post(endpoint + "?" + param[1], this.requestParam).subscribe(
      (res: RechargeResponse) => {
        if (res.response) {
          this.myRecharge = res.data;
          this.loading = false;
        } else {
          this.toast.showToast(res.message, "Recharge", "warning");
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

  checkStatus(transactionId: number) {
    this.loading=true;
    let postData={
      'transactionId':transactionId
    };
    this.http.post("recharge/check", postData).subscribe(res => {
      console.log(res);
      this.loading=false;
    })
  }
}
