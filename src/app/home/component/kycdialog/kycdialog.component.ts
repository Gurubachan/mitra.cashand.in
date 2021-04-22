import { Component, Input, OnInit } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import { ToastrService } from "../../../services/toastr.service";

@Component({
  selector: "ngx-kycdialog",
  templateUrl: "./kycdialog.component.html",
  styleUrls: ["./kycdialog.component.scss"],
})
export class KycdialogComponent implements OnInit {
  @Input() title: string;
  @Input() type: any;
  @Input() data: any;
  constructor(
    protected ref: NbDialogRef<KycdialogComponent>,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {}

  cancel() {
    this.ref.close();
  }
  childResponse(response: any) {
    if (response.response) {
      this.ref.close();
      this.toast.showToast(
        "Onboarding initiated successfully",
        "BC Onboarding",
        "success"
      );
    } else {
      this.toast.showToast(response.message, "BC Onboarding", "danger");
    }
    console.log("Kyc Dialog Response :", response);
  }
}
