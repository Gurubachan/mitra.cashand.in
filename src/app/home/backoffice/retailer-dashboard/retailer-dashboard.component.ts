import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { Data, ServiceWiseBusinessResponse } from "../../../@model/wallet/ServiceWiseBusinessResponse";
import { HttpService } from "../../../services/http.service";
import { MoreviewComponent } from "../../component/popover/moreview/moreview.component";
import { UpiComponent } from "../../component/popover/upi/upi.component";
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
  upiComponent = UpiComponent;
  myBalance = 0;
  @Input() user: any;

   isLoading = false;
  serviceWiseBusiness:Data[]=null;

  ngOnInit() {
    this.loadWalletBalance();
    this.loadServiceWiseBusiness();
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

   loadServiceWiseBusiness(){
    this.isLoading=true;
    let d = new Date();
    let month=d.getMonth()+1;
    let currentDate = d.getDate()+"-"+month+"-"+d.getFullYear();
    let param={
      "startDate":currentDate,
      "endDate":currentDate
    };
    this.http.post("reports/dailyBusiness",param).subscribe((res:ServiceWiseBusinessResponse) => {
      if(res.response){
        this.serviceWiseBusiness=res.data;
        this.isLoading=false;
         this.cd.detectChanges();
      }else{
        this.isLoading=false;
         this.cd.detectChanges();
      }
    })
  }
}
