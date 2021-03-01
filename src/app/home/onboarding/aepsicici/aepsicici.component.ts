import { Component, EventEmitter, OnInit, Output, Input } from "@angular/core";
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
        this.kycOnBoardedStatus.emit(result);
      },
      (error) => {
        this.submitted = false;
        this.showMessages.error = true;
        this.errors.push(error);
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
}
