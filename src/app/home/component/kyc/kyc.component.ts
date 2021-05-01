import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { HttpService } from "../../../services/http.service";

@Component({
  selector: "ngx-kyc",
  templateUrl: "./kyc.component.html",
  styleUrls: ["./kyc.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KycComponent implements OnInit, OnChanges {
  @Input() kyc: any;
  @ViewChild("fileInputAadhaar", { static: false })
  fileInputAadhaar: ElementRef;
  @ViewChild("fileInputPan", { static: false }) fileInputPan: ElementRef;
  user: any;
  showMessages: any = {};
  showForm: boolean = false;
  submitted: boolean = false;
  errors: string[] = [];
  messages: string[] = [];

  panimage: any = "../../../../assets/images/cs_logo.png";
  aadhaarimage: any = "../../../../assets/images/cs_logo.png";
  image: any = "../../../../assets/images/cs_logo.png";

  constructor(private cd: ChangeDetectorRef, private http: HttpService) {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    this.user = changes.kyc.currentValue;
    if (this.user.aadhaarCardPic !== null) {
      this.aadhaarimage = this.user.aadhaarCardPic;
    }

    if (this.user.panCardPic !== null) {
      this.panimage = this.user.panCardPic;
    }
  }
  edit() {
    this.showForm = true;
    this.cd.detectChanges();
  }

  onFormSubmit() {
    this.submitted = true;
    let doj = new Date();
    this.user.doj = doj;
    this.http.post("profile/office", this.user).subscribe(
      (res) => {
        if (res.response) {
          localStorage.setItem("user", JSON.stringify(res.data[0]));
          this.showMessages.success = true;
          this.showMessages.error = false;
          this.messages.push(res.message);
          this.submitted = false;
          this.showForm = false;
          this.cd.detectChanges();
        } else {
          this.showMessages.error = true;
          this.showMessages.success = false;
          this.errors.push(res.message);
          this.submitted = false;
          this.cd.detectChanges();
        }
      },
      (error) => {
        this.showMessages.error = true;
        this.showMessages.success = false;
        this.errors.push(this.checkMessage(error));
        this.submitted = false;
        this.cd.detectChanges();
      }
    );
  }

  selectImageSource(documentType: string) {
    if (documentType === "panimage") {
      this.fileInputPan.nativeElement.click();
    }
    if (documentType === "aadhaarimage") {
      this.fileInputAadhaar.nativeElement.click();
    }
  }

  uploadFile(event: EventTarget, documentType: string) {
    const eventObj: MSInputMethodContext = event as MSInputMethodContext;
    const target: HTMLInputElement = eventObj.target as HTMLInputElement;
    const file: File = target.files[0];

    let reader = new FileReader();
    reader.onload = (e) => {
      console.log(e.target.result);
      this.image = e.target.result;

      if (documentType === "panimage") {
        this.panimage = this.image;
        this.user.panimage = this.panimage;
      }
      if (documentType === "aadhaarimage") {
        this.aadhaarimage = this.image;
        this.user.aadhaarimage = this.aadhaarimage;
      }
      this.cd.detectChanges();
    };
    reader.readAsDataURL(file);
  }

  reset() {
    this.showForm = false;
  }
  checkMessage(reason: any) {
    let messageData = reason.error.message;
    let messageStore = "";
    if (typeof messageData === "object") {
      for (let k in messageData) {
        messageStore += messageData[k] + "<br>";
      }
    } else {
      messageStore = reason.error.message;
    }
    return messageStore;
  }
}
