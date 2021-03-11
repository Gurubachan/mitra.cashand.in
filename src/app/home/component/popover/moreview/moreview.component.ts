import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-moreview",
  templateUrl: "./moreview.component.html",
  styleUrls: ["./moreview.component.scss"],
})
export class MoreviewComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  payout() {
    this.router.navigateByUrl("services/payout");
  }
}
