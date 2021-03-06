import { Component, OnInit } from "@angular/core";
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
  constructor(private http: HttpService) {}
  myIp: string = null;
  ngOnInit(): void {
    this.getMyIp();
  }
  loadAEPSFrame(url) {
    let x = document.createElement("IFRAME");
    x.setAttribute("src", url);
    let frm = document.getElementById("aeps");
    frm.appendChild(x);
  }
  getMyIp() {
    /* this.httpClient
      .get("https://api.ipify.org/?format=json")
      .subscribe((result) => {
        console.log(result);
      }); */
    fetch("https://api.ipify.org/?format=json")
      .then((result) => result.json())
      .then((data) => {
        this.http
          .post("services/initTransaction", { myIp: data.ip })
          .subscribe((result) => {
            console.log(result);
            this.myIp = result.data;
            let url =
              "https://icici.bankmitra.org/Location.aspx?text=" +
              result.data[0].Result;
           // this.loadAEPSFrame(url);
           window.open(url, "_blank");
          });
      });
  }
}
