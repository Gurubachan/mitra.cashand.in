import { Component, Input, OnInit } from "@angular/core";
import { HttpService } from "../../../services/http.service";
@Component({
  selector: "ngx-verify",
  templateUrl: "./verify.component.html",
  styleUrls: ["./verify.component.scss"],
})
export class VerifyComponent implements OnInit {
  constructor(private http: HttpService) {}
  @Input() office: any;
  userGroup: any;
  userType: any;
  roleAssign: any = {
    userGroup: Number,
    userRole: Number,
  };
  services: any;
  submitted: boolean = false;
  loading: boolean = false;
  ngOnInit(): void {
    this.getGroup();
    this.getServices();
  }

  getGroup() {
    this.http.get("user/group").subscribe(
      (resulte) => {
        if (resulte.response) {
          this.userGroup = resulte.data;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getType() {
    this.http
      .post("user/type", { group: [this.roleAssign.userGroup] })
      .subscribe(
        (result) => {
          if (result.response) {
            this.userType = result.data;
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  assignRole() {
    if (this.roleAssign.userRole.length > 0) {
      console.log(this.office);
      this.submitted = true;
      this.http
        .post("user/update", {
          id: this.office.id,
          role: this.roleAssign.userRole,
        })
        .subscribe(
          (result) => {
            console.log(result);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  getServices() {
    this.http.get("services/service/" + this.office.id).subscribe((result) => {
      if (result.response) {
        this.services = JSON.parse(atob(result.data));
      }
    });
  }
  
  assignServices() {
    this.loading = true;
    //console.log(this.services);
    this.http
      .post("services/service", {
        userId: this.office.id,
        services: this.services,
      })
      .subscribe(
        (result) => {
          if (result.response) {
            this.services = JSON.parse(atob(result.data));
          }
          this.loading = false;
        },
        (err) => {
          this.loading = false;
        }
      );
  }
}
