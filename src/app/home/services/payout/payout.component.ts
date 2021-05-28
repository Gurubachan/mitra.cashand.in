import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';

import { HttpService } from '../../../services/http.service';
import { ToastrService } from '../../../services/toastr.service';

@Component({
  selector: 'ngx-payout',
  templateUrl: './payout.component.html',
  styleUrls: ['./payout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayoutComponent implements OnInit {
  showMessages: any = {};
  errors: string[] = [];
  messages: string[] = [];
  submitted: boolean = false;
  wallet: any = { txnMedium: Number, amount: Number };
  user: any;
  myBalance: any = 0;
  drawableBalance: any = 0;
  loading = false;

  bankSettlement: any;
  constructor(
    private cd: ChangeDetectorRef,
    private http: HttpService,
    private toast: ToastrService,
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
      /*console.log(this.user);*/
    }
    this.loadWalletBalance();
    this.wallet.txnMedium = 0;
    this.getLastSettlement();
  }
  initPayout() {
    this.errors = [];
    this.loading = true;
    this.submitted = true;
    this.cd.detectChanges();
    if (this.wallet.txnMedium == 0) {
      this.errors.push('Invalid Transaction medium');
    }
    if (
      this.wallet.amount >= 5000 &&
      this.wallet.amount <= this.drawableBalance
    ) {
      this.http.post('wallet/initSettlement', this.wallet).subscribe(
        (result) => {
          if (result.response) {
            this.toast.showToast(result.message, 'Bank Settlement', 'success');
            this.loadWalletBalance();
          } else {
            this.toast.showToast(result.message, 'Bank Settlement', 'danger');
          }
         /* console.log(result);*/
          this.loading = false;
          this.cd.detectChanges();
        },
        (err) => {
          this.toast.showToast(err.error.message, 'Bank Settlement', 'danger');
          /*console.log(err.error.message);*/
          this.loading = false;
          this.errors.push(err.error.message);
          this.showMessages.error = true;
          this.cd.detectChanges();
        },
      );
    } else {
      this.errors.push(
        'Enter amount not valid. Amount must be between 5000 and ' +
          this.drawableBalance,
      );
    }
    if (this.errors.length > 0) {
      this.showMessages.error = true;
      this.submitted = false;
      this.loading = false;
    }
    this.cd.detectChanges();
  }

  loadingMessage: String = 'Fetching account balance.';
  loadWalletBalance() {
    this.loading = true;
    // alert("Hi");
    this.loadingMessage = 'Checking with bank server.';
    this.toast.showToast(this.loadingMessage, 'Wallet Loading', 'success');
    this.cd.detectChanges();
    this.http.post('wallet/myBalance', null).subscribe(
      (result) => {
        const balance = result.data.balance;
        this.loadingMessage = 'Checking with bank server completed.';
        this.toast.showToast(this.loadingMessage, 'Wallet Loading', 'success');
        this.loading = false;
        /*console.log(this.loading);*/
        this.myBalance = parseInt(balance);
        if (this.myBalance > 10) {
          this.drawableBalance = this.myBalance - parseInt('10');
        }

        this.cd.detectChanges();
      },
      (err) => {
        /*console.log(err);*/
        this.toast.showToast(err.error.message, 'Wallet Loading', 'danger');
        this.loading = false;
        this.cd.detectChanges();
      },
    );
  }

  verifyAccount() {
    this.loading = true;
    this.http.post('wallet/verifyAccount', null).subscribe(
      (response) => {
        if (response.response) {
          this.user = response.data;
          this.toast.showToast(
            response.message,
            'Account Verification',
            'success',
          );
          this.loading = false;
          this.cd.detectChanges();
        }
      },
      (err) => {
        this.toast.showToast(
          err.error.message,
          'Account Verification',
          'danger',
        );
        this.loading = false;
        this.cd.detectChanges();
      },
    );
  }

  getLastSettlement() {
    this.http.get('wallet/bankSettlement').subscribe((res) => {
      /*console.log(res);*/
      if (res.response) {
        this.bankSettlement = res.data[0];
        this.cd.detectChanges();
      } else {
      }
    });
  }

  checkStatus() {
    this.http
      .post('wallet/getPayout', { merchant_ref_id: this.bankSettlement.id })
      .subscribe((res) => {
        this.bankSettlement = res.data;
        this.cd.detectChanges();
      });
  }
}
