import { Component, OnInit } from "@angular/core";

import * as $ from "jquery";
import { HttpService } from "../../../services/http.service";

@Component({
  selector: "ngx-aeps",
  templateUrl: "./aeps.component.html",
  styleUrls: ["./aeps.component.scss"],
})
export class AepsComponent implements OnInit {
  submitted: boolean = false;
  showMessages: any = {};
  errors: string[] = [];
  messages: string[] = [];
  myIp: string = null;
  closed = true;
  sts: string = "success";
  iciciAEPS: any = "../../../../assets/images/ICICIAeps.png";
  rblAEPS: any = "../../../../assets/images/RBLAeps.png";
  constructor(private http: HttpService) {}
  ngOnInit(): void {}
  openICICI() {
    this.getMyIp();
  }
  openRBL() {}
  url: any = null;
  message: string = "Fetching IP address.";
  getMyIp() {
    this.closed = false;
    this.sts = "success";
    fetch("https://api.ipify.org/?format=json")
      .then((result) => result.json())
      .then((data) => {
        this.message = "Authenticate with bank server.";
        this.http.post("services/initTransaction", { myIp: data.ip }).subscribe(
          (result) => {
            console.log(result);
            this.myIp = result.data;
            this.url =
              "https://icici.bankmitra.org/Location.aspx?text=" +
              result.data[0].Result;
            //$("#aeps").load(this.url);
            // this.loadAEPSFrame(url);
            this.message =
              "You have been successfully authenticated and redirect to bank end.!";
            window.open(this.url, "_blank");
          },
          (err) => {
            this.sts = "danger";
            this.message = err.error.message;
            console.log(err.error.message);
          }
        );
      });
  }
}
