import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { HttpService } from '../../../services/http.service';
import {ToastrService} from '../../../services/toastr.service';

@Component({
  selector: 'ngx-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent implements OnInit {
  constructor(private http: HttpService, private cd: ChangeDetectorRef, private toast: ToastrService) {}
  loading: boolean = false;
  toDayBusinessloading: boolean = false;
  loadingMessage: string = '';
  toDayBusinessloadingMessage: string = '';
  myBalance = 0;
  toDayBusiness = 0;
  ngOnInit(): void {
    this.loadWalletBalance();
    this.loadTodayBusiness();
  }

  loadWalletBalance() {
    this.loadingMessage = 'Balance Fetching...';
    this.loading = true;
    this.cd.detectChanges();
    this.http.get('admin/wallet').subscribe(
      (response) => {
        if (response.response) {
          /*console.log(response.data[0].balance);*/
          this.myBalance = response.data[0].balance;
          this.loadingMessage = response.message;
          this.loading = false;
          this.cd.detectChanges();
        } else {
          this.loading = false;
          this.cd.detectChanges();
        }
      },
      (err) => {
        this.toast.showToast(err.error.message, 'Wallet Balance', 'danger');
       /* console.log(err);*/
        this.cd.detectChanges();
      },
    );
  }

  loadTodayBusiness() {
    this.toDayBusinessloadingMessage = 'Balance Fetching...';
    this.toDayBusinessloading = true;
    this.cd.detectChanges();
    this.http.get('admin/todayBusiness').subscribe(
      (response) => {
        if (response.response) {
          /*console.log(response.data[0].balance);*/
          if (response.data[0].amount != null) {
            this.toDayBusiness = response.data[0].amount;
          }

          this.toDayBusinessloadingMessage = response.message;
          this.toDayBusinessloading = false;
          this.cd.detectChanges();
        } else {
          this.toDayBusinessloading = false;
          this.cd.detectChanges();
        }
      },
      (err) => {
        this.toast.showToast(err.error.message, 'Today Business', 'danger');
        this.cd.detectChanges();
      },
    );
  }
}
