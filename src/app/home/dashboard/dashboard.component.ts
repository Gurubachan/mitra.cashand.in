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
    this.user = JSON.parse(window.atob(localStorage.getItem("user")));
    this.cd.detectChanges();
  }
}
