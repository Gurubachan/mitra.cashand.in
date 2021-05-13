import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from "@angular/core";
import { HttpService } from "../../../services/http.service";

@Component({
  selector: "ngx-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent implements OnInit {
  constructor(private http: HttpService, private cd: ChangeDetectorRef) {}
  loading = false;
  myBalance = 0;
  ngOnInit(): void {
    this.loadWalletBalance();
  }

  loadWalletBalance() {
    this.http.get("admin/wallet").subscribe((response) => {
      if (response.response) {
        console.log(response.data[0].balance);
        this.myBalance = response.data[0].balance;
        this.cd.detectChanges();
      }
    });
  }
}
