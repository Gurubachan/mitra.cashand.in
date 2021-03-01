import {Component, Input, OnInit} from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import {HttpService} from '../../../services/http.service';

@Component({
  selector: 'ngx-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @Input() title: string;
  @Input() type: string;
  @Input() contact: string;
  resend: boolean = false;
  resendCount: number = 0;
  timer: number = 0;
  error: boolean = false;
  errorMessage: any ;
  constructor(protected ref: NbDialogRef<DialogComponent>, private http: HttpService) { }

  ngOnInit(): void {
    this.checkTimer();
  }

  cancel() {
    this.ref.close();
  }

  submit(otp) {
    this.ref.close(otp);
  }

  sendOtp() {
    if(this.type === 'email') {
      this.sendEmail();
    } else {
      this.sendSMS();
    }

  }

  checkTimer() {
    this.timer = 30;
    if (this.resendCount <= 3) {
      this.resend = false;
      const key = setInterval(() => {
        this.timer--;
      }, 1000);

      setTimeout(() => {
        clearInterval(key);
        this.resend = true;
        this.resendCount++;
      }, 30000);
    }

  }
  sendEmail(){
    this.error = false;
    this.http.post('profile/getEmailOTP', null)
      .subscribe(result => {
          if(result.response){
            this.checkTimer();
          } else {
            this.error = true;
            this.errorMessage = 'Sending error.';
          }
      }, (error => {
        this.error = true;
        this.errorMessage = 'Something error occurred.';
      }));
  }
  sendSMS() {
    this.error = false;
    this.http.post('profile/getOTP',{'contact':this.contact})
      .subscribe(result => {
        if(result.response){
          this.checkTimer();
        } else {
          this.error = true;
          this.errorMessage = 'Sending error.';
        }
      }, (error => {
        this.error = true;
        this.errorMessage = 'Something error occurred.';
      }));
  }
}
