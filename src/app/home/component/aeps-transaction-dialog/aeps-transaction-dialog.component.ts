import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from "@nebular/theme";

@Component({
  selector: 'ngx-aeps-transaction-dialog',
  templateUrl: './aeps-transaction-dialog.component.html',
  styleUrls: ['./aeps-transaction-dialog.component.scss']
})
export class AepsTransactionDialogComponent implements OnInit {

  @Input() title: String;
  @Input() data: any;
  
  constructor(protected ref: NbDialogRef<AepsTransactionDialogComponent>) { }

  ngOnInit(): void {

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
  cancel() {
    this.ref.close();
  }
  returnStatus(status: Number): String {
    if (status==0) {
      return "success";
    }
    
    return "danger";
  }

}
