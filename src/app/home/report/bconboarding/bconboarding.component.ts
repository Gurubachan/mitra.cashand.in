import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../../services/http.service";

@Component({
  selector: "ngx-bconboarding",
  templateUrl: "./bconboarding.component.html",
  styleUrls: ["./bconboarding.component.scss"],
})
export class BconboardingComponent implements OnInit {
  onBordedData: any;
  loading: boolean = false;
  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.getOnboarding();
  }

  getOnboarding() {
    this.loading = true;
    this.http.get("services/onboarded").subscribe((res) => {
      if (res.response) {
        this.onBordedData = res.data;
        this.loading = false;
      }
    });
  }

  goToPage(url: string) {
    this.loading = true;
    let param = url.split("?");
    console.log(param);
    this.http
      .get("services/onboarded" + "?" + param[1])
      .subscribe((res) => {
        if (res.response) {
          this.onBordedData = res.data;
          this.loading = false;
        }
      });
  }
}
