import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ngx-dmt",
  templateUrl: "./dmt.component.html",
  styleUrls: ["./dmt.component.scss"],
})
export class DmtComponent implements OnInit {
  errors: string[] = [];
  messages: string[] = [];
  submitted: boolean = false;
  showButton: boolean = false;
  dmt: any = {};
  constructor() {}

  ngOnInit(): void {}
  chekUser() {}
}
