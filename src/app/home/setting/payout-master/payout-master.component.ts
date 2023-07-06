import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../../services/http.service';
import {Router} from '@angular/router';
import {ToastrService} from '../../../services/toastr.service';
import {PayoutMasterResponse} from '../../../@model/payout-master/payoutMasterResponse';

@Component({
  selector: 'ngx-payout-master',
  templateUrl: './payout-master.component.html',
  styleUrls: ['./payout-master.component.scss'],
})
export class PayoutMasterComponent implements OnInit {
  loading: boolean = false;
  submitted: boolean = false;
  searchData: any = {};

  showMessages: any = {};
  errors: string[] = [];
  messages: string[] = [];
  wallet: any = { txnMedium: Number, amount: Number , contact: Number};
  user: any;
  myBalance: any = 0;
  drawableBalance: any = 0;
  bankSettlement: any;
  showUserForm: boolean = false;

  loadingMessage: String = 'Fetching account balance.';
  constructor(
    private http: HttpService,
    private router: Router,
    private toast: ToastrService,
    ) {
    this.wallet.txnMedium = 0;
  }

  ngOnInit(): void {
  }
  onFormSubmit() {
    this.loading = true;
    this.loadingMessage = 'Fetching user data';
    this.http
      .post('admin/user-payout', this.searchData)
      .subscribe(
        (res: PayoutMasterResponse) => {

          if (res.response) {
            this.user = res.data.bankingDetails;
            this.myBalance = this.user.balance;
            this.drawableBalance = this.user.balance - 10;
            this.bankSettlement = res.data.lastSettlement;
            this.loading = false;
            this.showUserForm = true;
          }
        },
        (err) => {
          this.loading = false;
          this.showUserForm = false;
        },
      );
  }

  initPayout() {
    if (
      this.wallet.amount >= 100 &&
      this.wallet.amount <= this.drawableBalance
    ) {
      this.loading = true;
      this.loadingMessage = 'Sending data for payout.';
      this.wallet.contact = this.searchData.contact;
      this.submitted = true;
      this.http.post('admin/initiate-user-payout', this.wallet).subscribe(res => {
        if (res.response) {
          this.toast.showToast(res.message, 'Bank Settlement', 'success');
        } else {
          this.toast.showToast(res.message, 'Bank Settlement', 'danger');
        }
        /* console.log(result);*/
        this.loading = false;
          this.showUserForm = false;
          this.wallet.amount = null;
          this.searchData.contact = null;
          this.submitted = false;
      },
        (err) => {
          this.toast.showToast(err.error.message, 'Bank Settlement', 'danger');
          /*console.log(err.error.message);*/
          this.loading = false;
          this.errors.push(err.error.message);
          this.showMessages.error = true;
          this.showUserForm = false;
          this.submitted = false;
        });
    }
  }



}
