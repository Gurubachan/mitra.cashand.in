import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";

@Component({
  selector: "ngx-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  title: string = null;
  user: any;
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.title = "Dashboard";
    this.user = JSON.parse(localStorage.getItem("user"));
    console.log("Dashboard:", this.user);
    console.log("Dashboard:", this.user.userGroup);
    this.cd.detectChanges();
  }
}
