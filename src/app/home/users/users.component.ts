import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../services/http.service";
import { NbDialogService } from "@nebular/theme";
import { ViewProfileComponent } from "./view-profile/view-profile.component";
@Component({
  selector: "ngx-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  usersList: any;
  search: any = {
    userGroup: Number,
    userRole: Number,
  };
  
  constructor(private http: HttpService, private dialog: NbDialogService) {}

  ngOnInit(): void {
    this.getUserList();
  }
  getUserGroup() {
    this.http.get("group").subscribe((result) => {
      console.log(result);
    });
  }
  getUserList() {
    this.http.post("users", {}).subscribe(
      (result) => {
        if (result.response) {
          this.usersList = result.data;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  view(user) {
     this.dialog.open(ViewProfileComponent, {
      autoFocus: false,
      backdropClass: "",
      closeOnBackdropClick: false,
      closeOnEsc: false,
      dialogClass: "",
      hasScroll: true,
      viewContainerRef: undefined,
      hasBackdrop: false,
      context: {
        user: user,
        isModal: true,
      },
    }); 
    console.log(user);
  }
  increment(value: number) {
    return (value = value + 1);
  }

  loginUpdate(user) {
    this.http
      .post("user/update", { id: user.id, loginAllowed: user.loginAllowed })
      .subscribe((result) => {});
  }
}
