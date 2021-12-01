import { Component, Input, OnInit } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import jspdf from "jspdf";
import html2canvas from "html2canvas";
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
  /* printPage() {
    //window.print();
    let data = document.getElementById("printArea");
    html2canvas(data).then((canvas) => {
      const contentDataURL = canvas.toDataURL("image/png");
      let pdf = new jspdf("l", "cm", "a4"); //Generates PDF in landscape mode
      //let pdf = new jspdf("p", "cm", "a5"); //Generates PDF in portrait mode
      pdf.addImage(contentDataURL, "PNG", 0, 0, 29.7, 21.0);
      pdf.save("Filename.pdf");
    });
  }  */
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
  returnStatus(status: Boolean): String {
    if (status) {
      return "success";
    }
    return "danger";
  }
}
