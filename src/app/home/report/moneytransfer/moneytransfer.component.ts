import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { NbDateService } from "@nebular/theme";
import { Observable, of } from "rxjs";
import { map, startWith } from "rxjs/operators";
import {
  Pagination,
  TransactionReport,
} from "../../../@model/moneytransfer/TransactionReport";
import { HttpService } from "../../../services/http.service";
import { ToastrService } from "../../../services/toastr.service";

@Component({
  selector: "ngx-moneytransfer",
  templateUrl: "./moneytransfer.component.html",
  styleUrls: ["./moneytransfer.component.scss"],
})
export class MoneytransferComponent implements OnInit {
  transactions: Pagination;
  loading: Boolean = false;

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
  constructor(
    private http: HttpService,
    private toast: ToastrService,
    protected dateService: NbDateService<Date>
  ) {
    this.frommin = this.dateService.addMonth(this.dateService.today(), -2);
    //this.frommax = this.dateService.addDay(this.min, 15);
    this.frommax = this.dateService.today();
    this.tomin = this.dateService.today();
    this.tomax = this.dateService.today();
    this.today = this.dateService.today();
  }

  ngOnInit(): void {
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
  myDmt() {
    let data = {
      startDate: this.formControl.value,
      endDate: this.ngModelDate,
    };
    this.requestParam = data;

    this.loading = true;
    this.http.post("dmt/transactions", this.requestParam).subscribe(
      (res: TransactionReport) => {
        if (res.response) {
          this.transactions = res.data;
          console.warn(this.transactions);
          this.loading = false;
        } else {
          this.toast.showToast(res.message, "Money Transfer", "warning");
          this.loading = false;
        }
      },
      (error) => {
        console.warn(error);
        this.toast.showToast(error.error.message, "Money Transfer", "danger");
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

    endpoint = "dmt/transactions";

    this.http.post(endpoint + "?" + param[1], this.requestParam).subscribe(
      (res: TransactionReport) => {
        if (res.response) {
          this.transactions = res.data;
          console.warn(this.transactions);
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
}
