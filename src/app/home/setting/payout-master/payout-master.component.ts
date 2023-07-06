import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../../services/http.service';
import {Router} from '@angular/router';
import {ToastrService} from '../../../services/toastr.service';

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
  wallet: any = { txnMedium: Number, amount: Number };
  user: any;
  myBalance: any = 0;
  drawableBalance: any = 0;
  bankSettlement: any;


  loadingMessage: String = 'Fetching account balance.';
  constructor(
    private http: HttpService,
    private router: Router,
    private toast: ToastrService,
    ) {

  }

  ngOnInit(): void {
  }
  onFormSubmit() {
    this.loading = true;
    this.http
      .post('admin/user-payout', this.searchData)
      .subscribe(
        (res) => {
          console.log(res);
          if (res.response) {
            this.user = res.data.;
            this.myBalance = res.data.balance;
            this.drawableBalance = res.data.balance - 10;
            this.loading = false;
          }
        },
        (err) => {
          console.log(err);
          this.loading = false;
        },
      );
  }

  initPayout(){

  }



}
