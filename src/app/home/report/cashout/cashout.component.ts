import { Component, OnInit } from "@angular/core";
import {
  Data,
  SettlementResponse,
} from "../../../@model/walletSettlement/cashoutResponse";
import { HttpService } from "../../../services/http.service";
import { ToastrService } from "../../../services/toastr.service";

@Component({
  selector: "ngx-cashout",
  templateUrl: "./cashout.component.html",
  styleUrls: ["./cashout.component.scss"],
})
export class CashoutComponent implements OnInit {
  settlement: Data = null;
  loading: Boolean = false;
  constructor(private http: HttpService, private toast: ToastrService) {}

  ngOnInit(): void {
    this.myCashout();
  }

  myCashout() {
    this.loading = true;
    this.http.post("wallet/cashout", null).subscribe(
      (res: SettlementResponse) => {
        if (res.response) {
          this.settlement = res.data;
        } else {
          this.toast.showToast(res.message, "Settlemet", "warning");
        }
        this.loading = false;
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
    let endpoint;

    endpoint = "wallet/cashout";

    this.http.post(endpoint + "?" + param[1], null).subscribe(
      (res: SettlementResponse) => {
        if (res.response) {
          this.settlement = res.data;
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
