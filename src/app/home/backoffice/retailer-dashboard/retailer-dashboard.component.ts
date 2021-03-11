import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { HttpService } from "../../../services/http.service";
import { MoreviewComponent } from "../../component/popover/moreview/moreview.component";
@Component({
  selector: "ngx-retailer-dashboard",
  templateUrl: "./retailer-dashboard.component.html",
  styleUrls: ["./retailer-dashboard.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RetailerDashboardComponent implements OnInit {
  constructor(private http: HttpService, private cd: ChangeDetectorRef) {}
  loading: boolean = false;
  loadingMessage: String = "Fetching account balance.";
  formComponent = MoreviewComponent;
  myBalance = 0;
  ngOnInit() {
    this.loadWalletBalance();
  }

  loadWalletBalance() {
    this.loading = true;
    //alert("Hi");
    this.loadingMessage = "Checking with bank server.";
    this.cd.detectChanges();
    this.http.post("wallet/myBalance", null).subscribe(
      (result) => {
        this.loadingMessage = "Checking with bank server completed.";
        this.loading = false;
        console.log(this.loading);
        this.myBalance = result.data.balance;
        this.cd.detectChanges();
      },
      (err) => {
        console.log(err);
        this.loading = false;
        this.cd.detectChanges();
      }
    );
  }
}
