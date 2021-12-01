import { Component, OnInit } from "@angular/core";
import { CheckfeaturesService } from "../../../../services/checkfeatures.service";
import { HttpService } from "../../../../services/http.service";
import { ToastrService } from "../../../../services/toastr.service";

@Component({
  selector: "ngx-upi",
  templateUrl: "./upi.component.html",
  styleUrls: ["./upi.component.scss"],
})
export class UpiComponent implements OnInit {
  upiImage: string = null;
  baseUrl: string = "https://cogentmind.tech/api/staticQRAPIWLCollection/";
  loading: boolean = false;
  constructor(
    private http: HttpService,
    private toast: ToastrService,
    private service: CheckfeaturesService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    if (this.service.isGiven(6)) {
      this.myQR();
    } else {
      this.toast.showToast("Service not available", "UPI", "error");
    }
    /* this.upiImage =
      "https://cogentmind.tech/api/staticQRAPIWLCollection/CashandmcJnOyVpWiXx.png"; */
  }

  myQR() {
    this.http.get("upi/myQR").subscribe(
      (res) => {
        if (res.response) {
          this.upiImage = this.baseUrl + res.data.onBoardReferance + ".png";
        } else {
          this.toast.showToast(res.message, "QR Onboarding", "warning");
        }
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.toast.showToast(error.error.message, "QR Onboarding", "warning");
        this.loading = false;
      }
    );
  }

  showMyQR() {}
}
