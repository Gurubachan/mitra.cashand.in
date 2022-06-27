import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import * as sdk from "../../../../assets/js/matm-sdk.js";

@Component({
  selector: "ngx-atm",
  templateUrl: "./atm.component.html",
  styleUrls: ["./atm.component.scss"],
})
export class AtmComponent implements OnInit {
  urlSafe: SafeResourceUrl;
  encryptedData: String =
    "hby%2FL%2FKTDcQLR2NwHH0boCxTokRTTm3zNfeH4Lsd9NJ4OU4AbdQxsioCZQC%2B2HBTlQqZ5oqjaDQSviyW05OEXe5f8K6JcFt8GhuMJfCBSOE%3D";
  url: string = "";
  options: String="%7B%220%22%3A%7B%7D%2C%22length%22%3A1%2C%22closeButton%22%3Anull%2C%22modal%22%3A%7B%7D%2C%22overlay%22%3Anull%2C%22transitionEnd%22%3A%22transitionend%22%2C%22options%22%3A%7B%22title%22%3A%22MATM%20SDK%22%2C%22autoOpen%22%3Afalse%2C%22className%22%3A%22zoom-and-spin%22%2C%22sticky%22%3Afalse%2C%22closeButton%22%3Atrue%2C%22closeButtonIcon%22%3A%22%22%2C%22closeIconInnerColor%22%3A%22%22%2C%22closeIconOuterColor%22%3A%22%22%2C%22content%22%3A%22%22%2C%22maxWidth%22%3A1200%2C%22minWidth%22%3A28";
  constructor(public sanitizer: DomSanitizer) {}
  user: any;
  ngOnInit(): void {
    this.user = JSON.parse(window.atob(localStorage.getItem("user")));
    console.log(this.user);
    /* this.url = "https://new-matm-gateway.web.app?data=" + this.encryptedData+  "&options=" + this.options;
    console.log(this.url);
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url); */
    this.init();
    
  }

  init(){
    const d = new Date();
  let time = d.getTime();
    sdk.myQuery("#demoCode").open({
      closeButton: true,
      title: "MATM",
      className : "zoom-and-spin",
      encryptedData:this.encryptedData,
      client_txnId:this.user.id,
      retailerUserName:"7894156444"
    });
  }
  
}
