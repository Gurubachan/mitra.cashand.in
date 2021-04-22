import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Input,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { HttpService } from "../../../services/http.service";

@Component({
  selector: "ngx-aepsicici",
  templateUrl: "./aepsicici.component.html",
  styleUrls: ["./aepsicici.component.scss"],
})
export class AepsiciciComponent implements OnInit {
  @Output() kycOnBoardedStatus = new EventEmitter<any>();
  @Input() service: any;

  aepsKyc: any = {};
  states: any;
  districts: any;
  submitted: boolean = false;
  showMessages: any = {};
  errors: string[] = [];
  messages: string[] = [];
  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.getState();
    console.log(this.service);
  }

  onFormSubmit() {
    this.submitted = true;
    console.log(this.aepsKyc);
    this.http.post("services/iciciKyc", this.aepsKyc).subscribe(
      (result: any) => {
        this.submitted = false;
        this.kycOnBoardedStatus.emit(result);
      },
      (error) => {
        this.submitted = false;
        this.showMessages.error = true;
        this.errors.push(error.error.message);
      }
    );
  }
  getState() {
    this.http.get("state").subscribe((result) => {
      this.states = result;
    });
  }

  getDistrict(e) {
    this.http.post("district", { stateid: e }).subscribe((result) => {
      this.districts = result;
    });
  }
  panimage: any = "../../../../assets/images/cs_logo.png";
  aadhaarimage: any = "../../../../assets/images/cs_logo.png";
  image: any = "../../../../assets/images/cs_logo.png";
  showErrors: boolean = false;
  showMessage: any;
  uploadFile(event: EventTarget, documentType: string) {
    const eventObj: MSInputMethodContext = event as MSInputMethodContext;
    const target: HTMLInputElement = eventObj.target as HTMLInputElement;
    const file: File = target.files[0];
    console.log(file.size / 1024);
    if (file.size / 1024 <= 200) {
      let reader = new FileReader();
      reader.onload = (e) => {
        console.log(e.target.result);
        this.image = e.target.result;

        if (documentType === "panimage") {
          this.panimage = this.image;
          this.aepsKyc.panimage = this.panimage;
        }
        if (documentType === "aadhaarimage") {
          this.aadhaarimage = this.image;
          this.aepsKyc.aadhaarimage = this.aadhaarimage;
        }
        // this.cd.detectChanges();
      };
      reader.readAsDataURL(file);
    } else {
      this.showErrors = true;
      this.showMessage = "Image Size greater than 200 KB";
    }
  }
  @ViewChild("fileInputAadhaar", { static: false })
  fileInputAadhaar: ElementRef;
  @ViewChild("fileInputPan", { static: false }) fileInputPan: ElementRef;
  selectImageSource(documentType: string) {
    if (documentType === "panimage") {
      this.fileInputPan.nativeElement.click();
    }
    if (documentType === "aadhaarimage") {
      this.fileInputAadhaar.nativeElement.click();
    }
  }
}
