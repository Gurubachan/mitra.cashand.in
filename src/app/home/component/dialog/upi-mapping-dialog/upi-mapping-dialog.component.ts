import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
@Component({
  selector: 'ngx-upi-mapping-dialog',
  templateUrl: './upi-mapping-dialog.component.html',
  styleUrls: ['./upi-mapping-dialog.component.scss']
})
export class UpiMappingDialogComponent implements OnInit {
@Input() title: string;
@Input() data: any;
  constructor(protected ref: NbDialogRef<UpiMappingDialogComponent>) { }

  ngOnInit(): void {
  }
  cancel() {
    this.ref.close(false);
  }

  submit(businessName,contact) {
   let outData={
      name: businessName,
      userId: contact
    }
    this.ref.close(outData);
  }

}
