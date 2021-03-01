import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { HttpService } from "../../../services/http.service";

@Component({
  selector: "ngx-bank",
  templateUrl: "./bank.component.html",
  styleUrls: ["./bank.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BankComponent implements OnInit, OnChanges {
  @Input() bank: any;
  @ViewChild("fileInput", { static: false }) fileInput: ElementRef;
  showForm: boolean = false;
  user: any;
  passbookImage: any = "../../../../assets/images/cs_logo.png";
  showMessages: any = {};
  submitted: Boolean = false;
  errors: string[] = [];
  messages: string[] = [];
  image: any = "../../../../assets/images/cs_logo.png";
  constructor(private cd: ChangeDetectorRef, private http: HttpService) {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges) {
    this.user = changes.bank.currentValue;
    this.passbookImage = this.user.accountImage;
  }

  edit() {
    this.showForm = true;
  }

  onFormSubmit() {
    this.messages = this.errors = [];
    this.submitted = true;
    this.http.post("profile/bank", this.user).subscribe(
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
        this.errors.push(this.checkMessage(error));
        this.submitted = false;
        this.cd.detectChanges();
      }
    );
  }

  selectImageSource() {
    this.fileInput.nativeElement.click();
  }

  uploadFile(event: EventTarget) {
    const eventObj: MSInputMethodContext = event as MSInputMethodContext;
    const target: HTMLInputElement = eventObj.target as HTMLInputElement;
    const file: File = target.files[0];
    let reader = new FileReader();
    reader.onload = (e) => {
      this.image = e.target.result;
      this.user.accountImage = this.image;
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

  getBankName() {
    if (this.user.ifsccode.length == 11) {
      this.http.post("getBank", { ifsccode: this.user.ifsccode }).subscribe(
        (response) => {
          this.user.bankname = response.data.BANK;
          this.cd.detectChanges();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
