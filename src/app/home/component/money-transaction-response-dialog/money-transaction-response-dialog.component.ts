import { Component, Input, OnInit } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import { Data } from "../../../@model/moneytransfer/TransactionResponse";

@Component({
  selector: "ngx-money-transaction-response-dialog",
  templateUrl: "./money-transaction-response-dialog.component.html",
  styleUrls: ["./money-transaction-response-dialog.component.scss"],
})
export class MoneyTransactionResponseDialogComponent implements OnInit {
  @Input() title: String;
  @Input() data: Data;
  constructor(
    protected ref: NbDialogRef<MoneyTransactionResponseDialogComponent>
  ) {}

  ngOnInit(): void {}
  cancel() {
    this.ref.close();
  }
  returnStatus(status: Boolean): String {
    if (status) {
      return "success";
    }
    return "danger";
  }
  printPage() {
    const printContents = document.getElementById("printArea").innerHTML;
    /*  const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents; */
    let printwindow = window.open("", "Print Voucher", "width=600,height=600");
    printwindow.document.write(printContents);
    printwindow.print();
    printwindow.close();
    this.cancel();
    /* window.print();
    document.body.innerHTML = originalContents; */
  }
}
