import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { HttpService } from "../../services/http.service";

@Component({
  selector: "ngx-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  @Input() user: any;
  @Input() isModal: boolean = false;

  constructor(private http: HttpService) {
    this.getUserData();
  }

  ngOnInit(): void {}
  changeTab(selectedTab) {
    console.log(selectedTab.tabTitle);
  }

  getUserData() {
    this.user = JSON.parse(window.atob(localStorage.getItem("user")));
  }
}
