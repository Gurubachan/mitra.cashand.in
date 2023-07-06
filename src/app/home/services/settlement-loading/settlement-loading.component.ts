import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { ToastrService } from '../../../services/toastr.service';
import { WalletBalance } from '../../../@model/api_settlement_wallet/WalletbalanceResponse';
import { LocationService } from '../../../services/location.service';

@Component({
  selector: 'ngx-settlement-loading',
  templateUrl: './settlement-loading.component.html',
  styleUrls: ['./settlement-loading.component.scss']
})
export class SettlementLoadingComponent implements OnInit {

  showMessages: any = {};
  errors: string[] = [];
  messages: string[] = [];
  submitted: boolean = false;
  
  myBalance: any = 0;
  drawableBalance: any = 0;
  loading = false;
  settlementWallet : WalletBalance;
  wallet: any = { amount: Number };
  constructor(private http: HttpService,
    private toast: ToastrService, private locationService : LocationService ) { }

  ngOnInit(): void {
    
     this.loadApiBalance();
     this.loadWalletBalance();
     this.location();
  }
location() {
    this.locationService.getPosition().then((pos) => {
      this.wallet.latitude=pos.lat;
      this.wallet.longitude=pos.lng;
      /* this.aadhaarService.latitude = pos.lat;
      this.aadhaarService.longitude = pos.lng; */
    });
  }
  loadingMessage: String = 'Fetching account balance.';
  loadWalletBalance() {
    this.loading = true;
    // alert("Hi");
    this.loadingMessage = 'Checking with bank server.';
    this.toast.showToast(this.loadingMessage, 'Wallet Loading', 'success');
  
    this.http.post('wallet/myBalance', null).subscribe(
      (result: any) => {
        const balance = result.data.balance;
        this.loadingMessage = 'Checking with bank server completed.';
        this.toast.showToast(this.loadingMessage, 'Wallet Loading', 'success');
        this.loading = false;
        /*console.log(this.loading);*/
        // tslint:disable-next-line:radix
        this.myBalance = parseInt(balance);
        if (this.myBalance > 1000) {
          // tslint:disable-next-line:radix
          this.drawableBalance = this.myBalance - parseInt('1000');
        }

       
      },
      (err) => {
        /*console.log(err);*/
        this.toast.showToast(err.error.message, 'Wallet Loading', 'danger');
        this.loading = false;
       
      },
    );
  }

  initPayout() {
    this.errors = [];
    this.loading = true;
    this.submitted = true;
    
    
    if (
      this.wallet.amount >= 1000 &&
      this.wallet.amount <= this.drawableBalance
    ) {
      this.http.post('api_client/loadBalance', this.wallet).subscribe(
        (result) => {
          if (result.response) {
            this.toast.showToast(result.message, 'Bank Settlement', 'success');
            this.loadWalletBalance();
             this.loadApiBalance();
             this.wallet.amount=null;
          } else {
            this.toast.showToast(result.message, 'Bank Settlement', 'danger');
          }
          /* console.log(result);*/
          this.loading = false;
          
        },
        (err) => {
          this.toast.showToast(err.error.message, 'Bank Settlement', 'danger');
          /*console.log(err.error.message);*/
          this.loading = false;
          this.errors.push(err.error.message);
          this.showMessages.error = true;
          
        },
      );
    } else {
      this.errors.push(
        'Enter amount not valid. Amount must be between 100 and ' +
          this.drawableBalance,
      );
    }
    if (this.errors.length > 0) {
      this.showMessages.error = true;
      this.submitted = false;
      this.loading = false;
    }
    
  }

  loadApiBalance(){
    this.loading = true;
    this.http.post('api_client/balance',{$1:25}).subscribe((res:WalletBalance)=>{
      this.settlementWallet=res;
      this.loading = false;
    });
  }

}
