import { Component, OnInit } from "@angular/core";
import { Data, UpiResponse } from "../../../@model/upi/upiResponse";
import { HttpService } from "../../../services/http.service";
import { ToastrService } from "../../../services/toastr.service";

@Component({
  selector: "ngx-upi",
  templateUrl: "./upi.component.html",
  styleUrls: ["./upi.component.scss"],
})
export class UpiComponent implements OnInit {
  upi: Data;
  loading: boolean = false;
  constructor(private http: HttpService, private toast: ToastrService) {}

  ngOnInit(): void {
    this.getTransaction();
  }

  getTransaction() {
    this.loading = true;
    this.http.post("upi/transaction", null).subscribe(
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
}
