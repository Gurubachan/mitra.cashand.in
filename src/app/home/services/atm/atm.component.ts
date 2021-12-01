import { Component, OnInit } from "@angular/core";
declare function openATM();
@Component({
  selector: "ngx-atm",
  templateUrl: "./atm.component.html",
  styleUrls: ["./atm.component.scss"],
})
export class AtmComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    openATM();
  }
}
