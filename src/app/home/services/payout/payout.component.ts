import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ngx-payout",
  templateUrl: "./payout.component.html",
  styleUrls: ["./payout.component.scss"],
})
export class PayoutComponent implements OnInit {
  constructor() {}
  wallet: any = {};
  ngOnInit(): void {}
  initPayout() {
    console.log(this.wallet);
  }
}
