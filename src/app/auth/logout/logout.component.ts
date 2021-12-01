import { Component, Inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  getDeepFromObject,
  NB_AUTH_OPTIONS,
  NbAuthResult,
  NbAuthService,
  NbAuthSocialLink,
  NbLogoutComponent,
} from "@nebular/auth";
import { delay } from "rxjs/operators";
@Component({
  selector: "ngx-logout",
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.scss"],
})
export class LogoutComponent extends NbLogoutComponent {
  redirectDelay: number = 500;
  showMessages: any = {};
  strategy: string = "email";
  socialLinks: NbAuthSocialLink[] = [];
  errors: string[] = [];
  messages: string[] = [];
  submitted = false;
  constructor(
    service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) options: {},
    router: Router
  ) {
    super(service, options, router);
    this.logout();
  }

  /* ngOnInit(): void {
  } */

  logout(): void {
    this.errors = this.messages = [];
    this.submitted = true;
    /* this.service
      .logout(this.strategy)
      .pipe(delay(this.redirectDelay))
      .subscribe((result: NbAuthResult) => {
        //console.log(result);
        this.router.navigate(["/auth/login"]);
      }); */
    this.service.logout(this.strategy).subscribe(
      (result: NbAuthResult) => {
        console.log(result);
        const redirect = result.getRedirect();
        if (redirect) {
          setTimeout(() => {
            localStorage.clear();
            // return this.router.navigateByUrl("/auth/login");
            return this.router.navigate(["/auth/login"]);
          }, this.redirectDelay);
        }
      },
      (error) => {
        setTimeout(() => {
          localStorage.clear();
          // return this.router.navigateByUrl("/auth/login");
          return this.router.navigate(["/auth/login"]);
        }, this.redirectDelay);
      }
    );
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
