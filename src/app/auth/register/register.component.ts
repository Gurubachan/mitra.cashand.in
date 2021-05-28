import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
} from '@angular/core';
import {
  getDeepFromObject,
  NB_AUTH_OPTIONS,
  NbAuthResult,
  NbAuthService,
  NbAuthSocialLink,
  NbRegisterComponent,
} from '@nebular/auth';
// import { NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';
// import {DialogComponent} from '../../additional/dialog/dialog.component';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent extends NbRegisterComponent {
  // over ride paramaters in NbRegisterComponent
  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  socialLinks: NbAuthSocialLink[] = [];
  constructor(
    service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) options: {},
    cd: ChangeDetectorRef,
    router: Router,
  ) {
    super(service, options, cd, router);

    this.redirectDelay = this.getConfigValue('forms.register.redirectDelay');
    this.showMessages = this.getConfigValue('forms.register.showMessages');
    this.strategy = this.getConfigValue('forms.register.strategy');
    this.socialLinks = this.getConfigValue('forms.login.socialLinks');
  }

  /*ngOnInit(): void {
  }*/

  register(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.service
      .register(this.strategy, this.user)
      .subscribe((result: NbAuthResult) => {
        this.submitted = false;
        /*console.log(result);*/
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
  /*open() {
    this.dialogService.open(DialogComponent, {
      context: {
        title: 'This is a title passed to the dialog component',
      },
      hasBackdrop: false,
      closeOnBackdropClick: false,
    });
  }*/
}
