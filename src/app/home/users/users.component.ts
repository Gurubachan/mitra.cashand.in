import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../services/http.service";
import { NbDialogService } from "@nebular/theme";
import { ViewProfileComponent } from "./view-profile/view-profile.component";
import { ToastrService } from "../../services/toastr.service";
import { admin } from "../../constants/admin";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  usersList: any;
  guestList: any;
  retailerList: any;
  gustaffList: any;
  loading: boolean = false;
  userLoading: boolean = false;
  filterData: any = {
    key: String,
    value: String,
  };
  search: any = {
    userGroup: Number,
    userRole: Number,
  };

  searchData: any = {};
  submitted: boolean = false;
  constructor(
    private http: HttpService,
    private dialog: NbDialogService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let user = JSON.parse(window.atob(localStorage.getItem("user")));
    if (admin.adminGroup.indexOf(user.role) > -1) {
      this.filterData.key = "role";
      this.filterData.value = "0";
      this.getUserList(this.filterData);
    } else {
      this.toast.showToast(
        "You are not authorised to access this url 😒 !",
        "Wrong Route",
        "warning"
      );
      this.router.navigateByUrl("/dashboard");
    }
  }
  getUserGroup() {
    this.http.get("group").subscribe((result) => {
      /* console.log(result);*/
    });
  }
  getUserList(data) {
    this.userLoading = true;
    this.http.post("users", data).subscribe(
      (result) => {
        if (result.response) {
          this.usersList = result.data;
          this.userLoading = false;
        }
      },
      (err) => {
        this.toast.showToast(err.error.message, "User List", "danger");
        this.userLoading = false;
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
    /*console.log(user);*/
  }
  increment(value: number) {
    return (value = value + 1);
  }

  loginUpdate(user) {
    this.http
      .post("user/update", { id: user.id, loginAllowed: user.loginAllowed })
      .subscribe((result) => {});
  }

  goToPage(url: string, data) {
    this.loading = true;
    const param = url.split("?");
    // console.log(param);
    this.http.post("users" + "?" + param[1], data).subscribe((res) => {
      if (res.response) {
        this.usersList = res.data;
        this.loading = false;
      }
    });
  }
  onFormSubmit() {
    this.loading = true;
    this.http
      .post("users", { key: "contact", value: this.searchData })
      .subscribe(
        (res) => {
          if (res.response) {
            this.usersList = res.data;
            this.loading = false;
          }
        },
        (err) => {
          console.log(err);
          this.loading = false;
        }
      );
  }

  changeTab(selectedTab) {
    console.log(selectedTab.tabTitle);
    if (selectedTab.tabTitle == "Guest") {
      this.filterData.key = "role";
      this.filterData.value = "0";
      this.getUserList(this.filterData);
    }
    if (selectedTab.tabTitle == "Retailers") {
      this.filterData.key = "role";
      this.filterData.value = "4";
      this.getUserList(this.filterData);
    }
  }
}
