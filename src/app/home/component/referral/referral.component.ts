import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { HttpService } from "../../../services/http.service";

@Component({
  selector: "ngx-referral",
  templateUrl: "./referral.component.html",
  styleUrls: ["./referral.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReferralComponent implements OnInit, OnChanges {
  @Input() referral: any;
  user: any;

  showMessages: any = {};
  errors: string[] = [];
  messages: string[] = [];
  submitted: boolean = false;
  loading: boolean = false;

  constructor(private cd: ChangeDetectorRef, private http: HttpService) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.user = changes.referral.currentValue;
    this.submitted = false;
    console.log(this.user);
  }

  ngOnInit(): void {}

  myReferral() {
    this.errors = [];
    this.messages = [];
    this.submitted = true;
    this.loading = true;
    if (this.user.referral.length == 10) {
      this.http.post("user/referral", this.user).subscribe(
        (res) => {
          if (res.response) {
            this.showMessages.success = true;
            this.messages.push(res.message);
            //console.log(res);
            this.user = res.data;
            this.loading = false;
            this.submitted = false;

            localStorage.setItem("user", JSON.stringify(res.data));

            this.cd.detectChanges();
          } else {
            this.showMessages.error = true;
            this.errors.push(res.message);
            //console.log(res);
            this.loading = false;
            this.submitted = false;
            this.cd.detectChanges();
          }
        },
        (err) => {
          this.loading = false;
          this.submitted = false;
          console.log(err);
          this.showMessages.error = true;
          this.errors.push(err.error.message);
          this.cd.detectChanges();
        }
      );
    } else {
      this.loading = false;
      console.log("Not a valid referral number.");
      this.cd.detectChanges();
    }
  }
}
