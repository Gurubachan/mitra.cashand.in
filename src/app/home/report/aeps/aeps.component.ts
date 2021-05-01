import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { NbDateService } from "@nebular/theme";
import { HttpService } from "../../../services/http.service";

@Component({
  selector: "ngx-aeps",
  templateUrl: "./aeps.component.html",
  styleUrls: ["./aeps.component.scss"],
})
export class AepsComponent implements OnInit {
  transactions: any;
  formControl = new FormControl(new Date());
  ngModelDate = new Date();
  selectedTxnType;
  selectedTxnStatus;
  frommin: Date;
  frommax: Date;
  tomin: Date;
  tomax: Date;
  today: Date;
  loading: boolean = false;
  constructor(
    private http: HttpService,
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
    // this.fetchTransaction();
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
  }
  fetchTransaction() {
    this.loading = true;
    let data = {
      startDate: this.formControl.value,
      endDate: this.ngModelDate,
      type: this.selectedTxnType,
      status: this.selectedTxnStatus,
    };
    // console.log(data);
    this.http.post("services/transaction", data).subscribe(
      (resulte) => {
        if (resulte.response) {
          this.transactions = resulte.data;
          this.loading = false;
        }
      },
      (err) => {
        console.log(err);
        this.loading = false;
      }
    );
  }

  goToPage(url: string) {
    this.loading = true;
    let param = url.split("?");
    //console.log(param);
    let data = {
      startDate: this.formControl.value,
      endDate: this.ngModelDate,
      type: this.selectedTxnType,
      status: this.selectedTxnStatus,
    };
    this.http
      .post("services/transaction" + "?" + param[1], data)
      .subscribe((res) => {
        if (res.response) {
          this.transactions = res.data;
          this.loading = false;
        }
      });
  }
}
