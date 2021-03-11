import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
} from "@angular/core";
import {
  NB_AUTH_OPTIONS,
  NbAuthService,
  NbLoginComponent,
  getDeepFromObject,
  NbAuthResult,
} from "@nebular/auth";
import { NbAuthSocialLink } from "@nebular/auth/auth.options";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent extends NbLoginComponent {
  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = "email";
  errors: string[] = [];
  messages: string[] = [];

  // user: { contact: bigint; password: string };
  user: any = {};
  loading = false;

  submitted: boolean = false;
  socialLinks: NbAuthSocialLink[];
  rememberMe: boolean = false;
  constructor(
    service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) options: {},
    cd: ChangeDetectorRef,
    router: Router
  ) {
    super(service, options, cd, router);

    this.redirectDelay = this.getConfigValue("forms.login.redirectDelay");
    this.showMessages = this.getConfigValue("forms.login.showMessages");
    this.strategy = this.getConfigValue("forms.login.strategy");
    this.socialLinks = this.getConfigValue("forms.login.socialLinks");
    this.rememberMe = this.getConfigValue("forms.login.rememberMe");
    if (this.service.getToken()) {
      this.router.navigateByUrl("/dashboard");
    }
  }
  login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;
    this.loading = true;
    this.service
      .authenticate(this.strategy, this.user)
      .subscribe((result: NbAuthResult) => {
        this.submitted = false;
        this.loading = false;
        console.log(result.getResponse());
        if (result.isSuccess()) {
          // console.log(result.getToken().token);
          /* let encr = this.EncrDecr.set(
            JSON.stringify(result.getResponse().body.data.user)
          );
          console.log(encr);*/
          localStorage.setItem(
            "user",
            JSON.stringify(result.getResponse().body.data.user)
          );

          /*console.log(this.EncrDecr.get(encr));*/
          this.messages = result.getMessages();
        } else {
          //this.errors = result.getErrors();
          this.errors = result.getResponse().error.errors;
        }

        const redirect = result.getRedirect();
        if (redirect) {
          setTimeout(() => {
            return this.router.navigateByUrl(redirect);
          }, this.redirectDelay);
        }
        this.cd.detectChanges();
      });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
