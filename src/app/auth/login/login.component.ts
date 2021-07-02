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
import { LocationService } from "../../services/location.service";

@Component({
  selector: "ngx-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent extends NbLoginComponent {
  redirectDelay: number = 0;

  strategy: string = "email";
  showMessages: any = {};
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
    router: Router,
    private locationService: LocationService
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
    this.location();
  }
  login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;
    this.loading = true;
    this.service.authenticate(this.strategy, this.user).subscribe(
      (result: NbAuthResult) => {
        this.submitted = false;
        this.loading = false;
        // console.log(result.getResponse());
        if (result.isSuccess()) {
          // console.log(result.getToken().token);
          /* let encr = this.EncrDecr.set(
            JSON.stringify(result.getResponse().body.data.user)
          );
          console.log(encr);*/
          localStorage.setItem(
            "user",
            btoa(JSON.stringify(result.getResponse().body.data.user))
          );

          /*console.log(this.EncrDecr.get(encr));*/
          this.messages = result.getMessages();
        } else {
          // console.log(result.getErrors());
          // this.errors = result.getErrors();
          this.errors = result.getErrors();
        }

        const redirect = result.getRedirect();
        if (redirect) {
          setTimeout(() => {
            return this.router.navigateByUrl(redirect);
          }, this.redirectDelay);
        }
        this.cd.detectChanges();
      },
      (err) => {
        alert(err.message);
        /*console.log(err.message);*/
      }
    );
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  location() {
    this.locationService.getPosition().then((pos) => {
      /*console.log(`Positon: ${pos.lng} ${pos.lat}`);*/
    });
  }
}
