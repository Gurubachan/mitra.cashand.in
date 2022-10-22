import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
@Component({
  selector: 'ngx-bene-verification-dialog',
  templateUrl: './bene-verification-dialog.component.html',
  styleUrls: ['./bene-verification-dialog.component.scss']
})
export class BeneVerificationDialogComponent implements OnInit {
@Input() title: string;
@Input() data: any;
  constructor(protected ref: NbDialogRef<BeneVerificationDialogComponent>) { }

  ngOnInit(): void {
  }

  cancel() {
    this.ref.close(false);
  }

  submit(name: String, account: String, ifsc: String) {
      
  }

}
