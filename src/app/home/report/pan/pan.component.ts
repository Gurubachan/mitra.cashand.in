import { Component, OnInit } from "@angular/core";

import { Data, PanResponse } from "../../../@model/pan/panResponse";
import { HttpService } from "../../../services/http.service";
import { ToastrService } from "../../../services/toastr.service";

@Component({
  selector: "ngx-pan",
  templateUrl: "./pan.component.html",
  styleUrls: ["./pan.component.scss"],
})
export class PanComponent implements OnInit {
  loading: Boolean = false;
  myPan: Data = null;
  constructor(private http: HttpService, private toast: ToastrService) {}

  ngOnInit(): void {
    this.getPan();
  }

  getPan() {
    this.loading = true;
    this.http.get("uti/pan").subscribe(
      (res: PanResponse) => {
        if (res.response) {
          this.myPan = res.data;
        } else {
          this.toast.showToast(res.message, "Pan", "warning");
        }
        this.loading = false;
      },
      (error) => {
        console.log(error);
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

    endpoint = "uti/pan";

    this.http.get(endpoint + "?" + param[1]).subscribe((res: PanResponse) => {
      if (res.response) {
        this.myPan = res.data;
        this.loading = false;
      }
    });
  }
}
