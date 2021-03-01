import { Component, Input, OnInit } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";

@Component({
  selector: "ngx-kycdialog",
  templateUrl: "./kycdialog.component.html",
  styleUrls: ["./kycdialog.component.scss"],
})
export class KycdialogComponent implements OnInit {
  @Input() title: string;
  @Input() type: any;
  @Input() data: any;
  constructor(protected ref: NbDialogRef<KycdialogComponent>) {}

  ngOnInit(): void {
   
  }

  cancel() {
    this.ref.close();
  }
  childResponse(response: any) {
    console.log("Kyc Dialog Response :", response);
  }
}
