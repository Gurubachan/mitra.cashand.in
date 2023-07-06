import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Data, ServiceWiseBusinessResponse } from '../../../@model/wallet/ServiceWiseBusinessResponse';
import { HttpService } from '../../../services/http.service';
import { MoreviewComponent } from '../../component/popover/moreview/moreview.component';
import { UpiComponent } from '../../component/popover/upi/upi.component';
import { WalletBalance } from '../../../@model/api_settlement_wallet/WalletbalanceResponse';
import { ApiMoreViewComponent } from '../../component/popover/api-more-view/api-more-view.component';
@Component({
  selector: 'ngx-retailer-dashboard',
  templateUrl: './retailer-dashboard.component.html',
  styleUrls: ['./retailer-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RetailerDashboardComponent implements OnInit {
  constructor(private http: HttpService, private cd: ChangeDetectorRef) {}
  loading: boolean = false;
  loadingMessage: String = 'Fetching account balance.';
  formComponent = MoreviewComponent;
  upiComponent = UpiComponent;
  apiMoreView = ApiMoreViewComponent;
  myBalance = 0;
  loyaltyBalance = 0;
  levelOneIncome = 0;
  levelTwoIncome = 0;
  levelThreeIncome = 0;
  levelIncome = this.levelOneIncome + this.levelTwoIncome + this.levelThreeIncome;
  @Input() user: any;

   isLoading = false;
  serviceWiseBusiness: Data[] = null;
  settlementWallet : WalletBalance;
  ngOnInit() {
    this.loadWalletBalance();
    this.loadServiceWiseBusiness();
    this.loadApiBalance();
  }

  loadWalletBalance() {
    this.loading = true;
    // alert("Hi");
    this.loadingMessage = 'Checking with bank server.';
    this.cd.detectChanges();
    this.http.post('wallet/myBalance', null).subscribe(
      (result) => {
        this.loadingMessage = 'Checking with bank server completed.';
        this.loading = false;
        console.log(this.loading);
        this.myBalance = result.data.balance;
        this.cd.detectChanges();
      },
      (err) => {
        console.log(err);
        this.loading = false;
        this.cd.detectChanges();
      },
    );
  }

  loadLoyalty() {
    this.loading = true;
    this.loadingMessage = 'Checking loyalty bonus...';
    this.cd.detectChanges();
    this.http.get('loyalty/myBalance').subscribe((res) => {
      this.loadingMessage = 'balance fetched successfully.';
      this.loyaltyBalance = res.data.balance;
      this.loading = false;
      this.cd.detectChanges();
    }, (err) => {
      this.loading = false;
      this.cd.detectChanges();
    });
  }

  loadLevelIncome() {
    this.loading = true;
    this.loadingMessage = 'fetching latest value.';
    this.cd.detectChanges();
    this.http.get('referral/MyBalance').subscribe((res) => {
      this.loadingMessage = 'balance fetched successfully.';
      this.levelOneIncome = res.data.levelOneIncome;
      this.levelTwoIncome = res.data.levelTwoIncome;
      this.levelThreeIncome = res.data.levelThreeIncome;
    }, (err) => {
      this.loading = false;
      this.cd.detectChanges();
    });
  }

   loadServiceWiseBusiness() {
    this.isLoading = true;
    const d = new Date();
    const month = d.getMonth() + 1;
    const currentDate = d.getDate() + '-' + month + '-' + d.getFullYear();
    const param = {
      'startDate': currentDate,
      'endDate': currentDate,
    };
    this.http.post('reports/dailyBusiness', param).subscribe((res: ServiceWiseBusinessResponse) => {
      if (res.response) {
        this.serviceWiseBusiness = res.data;
        this.isLoading = false;
         this.cd.detectChanges();
      } else {
        this.isLoading = false;
         this.cd.detectChanges();
      }
    });
  }

  loadApiBalance(){
    this.isLoading = true;
    this.http.post('api_client/balance',{$1:25}).subscribe((res:WalletBalance)=>{
      this.settlementWallet=res;
      this.isLoading = false;
       this.cd.detectChanges();
    });
  }
}
