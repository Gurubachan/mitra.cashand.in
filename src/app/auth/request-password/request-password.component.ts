import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from "@angular/core";
import { Router } from "@angular/router";
import {
  getDeepFromObject,
  NbAuthResult,
  NbAuthService,
  NbRequestPasswordComponent,
  NB_AUTH_OPTIONS,
} from "@nebular/auth";

@Component({
  selector: "ngx-request-password",
  templateUrl: "./request-password.component.html",
  styleUrls: ["./request-password.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestPasswordComponent extends NbRequestPasswordComponent {
  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = "";

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};

  constructor(
    protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router
  ) {
    super(service, options, cd, router);
     this.redirectDelay = this.getConfigValue(
      "forms.requestPassword.redirectDelay"
    ); 
    this.showMessages = this.getConfigValue(
      "forms.requestPassword.showMessages"
    );
    this.strategy = this.getConfigValue("forms.requestPassword.strategy");
  }

  requestPass(): void {
    this.errors = this.messages = [];
    this.submitted = true;
    console.log(this.strategy, this.user);
    this.service
      .requestPassword(this.strategy, this.user)
      .subscribe((result: NbAuthResult) => {
        this.submitted = false;

        if (result.isSuccess()) {
          let data = result.getResponse().body.data;
          console.log(data);
          localStorage.setItem("otp", JSON.stringify(data));
          
          this.messages = result.getMessages();
        } else {
          this.errors = result.getErrors();
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
