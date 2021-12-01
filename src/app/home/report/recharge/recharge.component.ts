import { Component, OnInit } from "@angular/core";
import {
  RechargeResponse,
  Data,
} from "../../../@model/recharge/rechargeResponse";
import { HttpService } from "../../../services/http.service";
import { ToastrService } from "../../../services/toastr.service";

@Component({
  selector: "ngx-recharge",
  templateUrl: "./recharge.component.html",
  styleUrls: ["./recharge.component.scss"],
})
export class RechargeComponent implements OnInit {
  myRecharge: Data = null;
  loading: Boolean = false;
  constructor(private http: HttpService, private toast: ToastrService) {}

  ngOnInit(): void {
    this.getRecharge();
  }

  getRecharge() {
    this.loading = true;
    this.http.post("recharge/myTransaction", null).subscribe(
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

    this.http.post(endpoint + "?" + param[1], null).subscribe(
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
}
