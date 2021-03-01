import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {HttpService} from '../../../services/http.service';
import { NbDialogService } from '@nebular/theme';
import { DialogComponent} from '../dialog/dialog.component';

@Component({
  selector: 'ngx-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent implements OnInit, OnChanges {
  @Input() about: any;
  @ViewChild('form') form: HTMLFormElement;
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  dateOfBirth: Date;
  userData: any = {};
  user: any = {};
  showMessages: any = {};
  showForm: boolean = false;
  submitted: boolean = false;
  errors: string[] = [];
  messages: string[] = [];
  pinCodes: any;
  image: any = '../../../../assets/images/cloud-upload-outline.png';

  selectedPinCodeId: number;
  isContactVerified: boolean = false;
  isEmailVerified: boolean = false;
  otp: number;
  genderSelected: string;
  constructor(private dialogService: NbDialogService,
              private http: HttpService,
              private cd: ChangeDetectorRef) {

  }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges) {
    this.user = changes.about.currentValue;
    this.userData = this.user;
    this.dateOfBirth = new Date(this.user.dob);
    this.user.pin = this.user.PinCode;
    this.genderSelected = this.user.gender;
    if (this.user.contact_verified_at != null) {
      this.isContactVerified = true;
    }
    if (this.user.email_verified_at != null) {
      this.isEmailVerified = true;
    }
  }

  onFormSubmit() {
    this.submitted = true;
    this.http
      .post('profile/about', this.user)
      .subscribe((result: any) => {
        if (result.response) {
          localStorage.setItem('user', JSON.stringify(result.data[0]));
          this.submitted = false;
          this.showForm = false;
          this.cd.detectChanges();
        }
      }, (error => {
        this.showMessages.error = true;
        this.errors.push(error.message);
        this.cd.detectChanges();
      }));
  }

  getPinCodeDetails() {
    if (this.user.pin.length === 6) {
      this.user.pinCodes = '';
      this.http
        .get('pinCode/' + this.user.pin)
        .subscribe((result: any) => {
          if (result.response) {
           this.pinCodes = result.data;
           if (this.user.pincode !== '') {
             this.selectedPinCodeId = this.user.pincode;
             this.cd.detectChanges();
           }
          }
        });
    }

  }
  edit() {
    this.showForm = true;
    this.getPinCodeDetails();
    if (this.user.myPic !== '') {
      this.image = this.user.myPic;
    }
    this.cd.detectChanges();
  }
  reset() {

    this.user = this.userData;
    this.showForm = false;
  }

  uploadFile(event: EventTarget) {
    const eventObj: MSInputMethodContext = event as MSInputMethodContext;
    const target: HTMLInputElement = eventObj.target as HTMLInputElement;
    const file: File = target.files[0];
    let reader = new FileReader();
    reader.onload = (e) => {
     // console.log(e.target.result);
      this.image = e.target.result;
      this.user.myPic = this.image;
     // this.aboutForm.controls["myPic"].setValue(this.image);
      this.cd.detectChanges();
    };
    reader.readAsDataURL(file);

  }
  selectImageSource() {
    this.fileInput.nativeElement.click();
  }

  verify(type: string) {
    if (type === 'contact') {
      this.http
        .post('profile/getOTP', {'contact': this.about.contact})
        .subscribe((result) => {
          if (result.response) {
            this.dialogService.open(DialogComponent, {
              autoFocus: false,
              backdropClass: '',
              closeOnBackdropClick: false,
              closeOnEsc: false,
              dialogClass: '',
              hasScroll: false,
              viewContainerRef: undefined,
              hasBackdrop: false, context: {
                title: 'Contact Verification',
                type: 'contact',
                contact: this.about.contact,
              }})
              .onClose
              .subscribe(response => {
                this.otp = response;
                if (this.otp !== undefined) {
                  this.http
                    .post('profile/verify', {'contact': this.about.contact, 'otp': this.otp})
                    .subscribe(result => {
                      if (result.response) {
                        this.isContactVerified = true;
                        this.cd.detectChanges();
                      } else {
                        console.log(result);
                      }
                    });
                }

              });
          }
      });

    }
    if (type === 'email') {

      this.http
        .post('profile/getEmailOTP', null)
        .subscribe((result) => {
          if (result.response) {
            this.dialogService.open(DialogComponent, {
              autoFocus: false,
              backdropClass: "",
              closeOnBackdropClick: false,
              closeOnEsc: false,
              dialogClass: "",
              hasScroll: false,
              viewContainerRef: undefined,
              hasBackdrop: false, context: {
                title: 'Email Verification',
                type: 'email',
              }})
              .onClose
              .subscribe(response => {
                this.otp = response;
                if (this.otp !== undefined) {
                  this.http
                    .post('profile/verifyEmail', {'email': this.about.email, 'otp': this.otp})
                    .subscribe(result => {
                      if (result.response) {
                        this.isEmailVerified = true;
                        this.cd.detectChanges();
                      } else {
                       console.log(result);
                      }
                    });
                }

              });
          }else {
            alert('Something error occurred.');
          }
        }, (error => {
          alert('Something error occurred.');
        }));
    }
  }
}
