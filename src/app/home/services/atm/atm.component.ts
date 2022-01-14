import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
@Component({
  selector: "ngx-atm",
  templateUrl: "./atm.component.html",
  styleUrls: ["./atm.component.scss"],
})
export class AtmComponent implements OnInit {
  urlSafe: SafeResourceUrl;
  encryptedData: String =
    "hby%2FL%2FKTDcQLR2NwHH0boLcuYNScqCZyVHd1kReA%2FOyjyO212%2FcWWrce%2Fp9gpoqNGcW%2BzoapgkXzdnLo7z3friYdKsvBGjO06jH9ioqUDuY%3D";
  url: string = "";
  constructor(public sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.url = "https://new-matm-gateway.web.app?data=" + this.encryptedData;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }
}
