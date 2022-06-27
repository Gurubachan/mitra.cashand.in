import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
@Component({
  selector: 'ngx-remark-dialog',
  templateUrl: './remark-dialog.component.html',
  styleUrls: ['./remark-dialog.component.scss']
})
export class RemarkDialogComponent implements OnInit {
 @Input() title: string;
  constructor(protected ref: NbDialogRef<RemarkDialogComponent>) { }

  ngOnInit(): void {
  }
cancel() {
    this.ref.close();
  }

  submit(otp) {
    this.ref.close(otp);
  }
}
