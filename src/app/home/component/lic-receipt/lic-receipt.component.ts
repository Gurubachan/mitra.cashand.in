import { Component, Input, OnInit } from '@angular/core';
import { Data } from '../../../@model/utility/licPaymentRespnse';
import { NbDialogRef } from "@nebular/theme";
@Component({
  selector: 'ngx-lic-receipt',
  templateUrl: './lic-receipt.component.html',
  styleUrls: ['./lic-receipt.component.scss']
})
export class LicReceiptComponent implements OnInit {
  @Input() title: String;
  @Input() data: Data;
  constructor(protected ref: NbDialogRef<LicReceiptComponent>) { 
    
  }

  ngOnInit(): void {
  }

  cancel() {
    this.ref.close();
  }
  returnStatus(status: string): String {
    if (status!="failed") {
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
