import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { NbDialogRef } from "@nebular/theme";

@Component({
  selector: "ngx-view-profile",
  templateUrl: "./view-profile.component.html",
  styleUrls: ["./view-profile.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewProfileComponent implements OnInit {
  @Input() user: any;
  @Input() isModal: boolean = false;

  constructor(protected ref: NbDialogRef<ViewProfileComponent>) {}
  //constructor() {}

  ngOnInit(): void {}
  changeTab(selectedTab) {
    console.log(selectedTab.tabTitle);
    if (selectedTab.tabTitle == "Close") {
      this.close();
    }
    if (selectedTab.tabTitle == "Bank") {
      console.log(document.getElementById("bank").offsetWidth);
    }
  }
  close() {
    this.ref.close();
  }
}
