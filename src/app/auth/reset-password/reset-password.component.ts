import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  getDeepFromObject,
  NbAuthResult,
  NbAuthService,
  NbResetPasswordComponent,
  NB_AUTH_OPTIONS,
} from '@nebular/auth';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'ngx-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent extends NbResetPasswordComponent {
  /* constructor() { }

  ngOnInit(): void {
  } */
  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  showForm: boolean = false;
  constructor(
    protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router,
    private http: HttpService,
  ) {
    super(service, options, cd, router);
    this.redirectDelay = this.getConfigValue(
      'forms.resetPassword.redirectDelay',
    );
    this.showMessages = this.getConfigValue('forms.resetPassword.showMessages');
    this.strategy = this.getConfigValue('forms.resetPassword.strategy');
    this.user = JSON.parse(localStorage.getItem('otp'));
    /*console.log(this.user);*/
  }
  checkOtp() {
     this.errors = this.messages = [];
    /*console.log(this.user);*/
    this.submitted = true;
    this.http.post('auth/verify', this.user).subscribe((res) => {
     /* console.log(res);*/
      const message = res.message;
      if (res.response) {
        this.showMessages.success = true;
        this.showMessages.error = false;
        this.user.otp = '';
        this.showForm = true;
        this.messages.push(message);
      } else {
        this.user.otp = '';
        if (typeof message === 'object') {
          for (const k in message) {
            this.showMessages.error = true;
            if (message[k][0] !=='') {
              this.errors.push(message[k][0]);
            }
          }
        } else {
           this.messages = message;
        }
      }
      this.submitted = false;
      this.cd.detectChanges();
    }, (error => {
      this.errors.push(error.error.message);
      this.showMessages.error = true;
      this.submitted = false;
      this.user.otp = '';
      this.cd.detectChanges();
    }));
  }
  resetPass(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.service
      .resetPassword(this.strategy, this.user)
      .subscribe((result: NbAuthResult) => {
        this.submitted = false;
        if (result.isSuccess()) {
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
