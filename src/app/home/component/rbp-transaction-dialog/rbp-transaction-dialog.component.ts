import { Component, Input, OnInit } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";

@Component({
  selector: "ngx-rbp-transaction-dialog",
  templateUrl: "./rbp-transaction-dialog.component.html",
  styleUrls: ["./rbp-transaction-dialog.component.scss"],
})
export class RbpTransactionDialogComponent implements OnInit {
  @Input() title: String;
  @Input() data: any;
  constructor(protected ref: NbDialogRef<RbpTransactionDialogComponent>) {}

  ngOnInit(): void {}
  printPage() {
    window.print();
  }
  cancel() {
    this.ref.close();
  }
}
