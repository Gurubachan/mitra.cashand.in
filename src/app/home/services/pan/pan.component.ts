import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CheckfeaturesService } from "../../../services/checkfeatures.service";

import { HttpService } from "../../../services/http.service";
import { ToastrService } from "../../../services/toastr.service";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
@Component({
  selector: "ngx-pan",
  templateUrl: "./pan.component.html",
  styleUrls: ["./pan.component.scss"],
})
export class PanComponent implements OnInit {
  utiPan: any = "../../../../assets/images/pan.jpg";
  closed = true;
  sts: string = "success";
  url: any = null;
  message: string = "Checking system configuration.";
  showOnBoardingForm: boolean = false;
  submitted: boolean = false;
  panOnboardingForm: FormGroup;

  states: any;
  districts: any;
  urlSafe: SafeResourceUrl;
  constructor(
    private http: HttpService,
    private router: Router,
    private toast: ToastrService,
    private formBuilder: FormBuilder,
    private features: CheckfeaturesService,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.panOnboardingForm = this.formBuilder.group({
      stateId: ["", Validators.required],
      districtId: ["", Validators.required],
    });
  }

  openPan() {
    if (this.features.isGiven(17)) {
      this.checkStatus();
    } else {
      this.toast.showToast("Feature not allowed", "Feature", "warning");
      this.router.navigateByUrl("/dashboard");
    }
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

  //get the status of onboarding.
  checkStatus() {
    this.closed = false;
    this.sts = "success";
    this.message = "Checking your registration with UTI server....";
    this.http.post("services/myStatus", { serviceId: 17 }).subscribe(
      (res) => {
        console.log(res);
        if (res.response) {
          this.init();
        } else {
          this.toast.showToast(
            "You are not onboarded for pan creation. Please onboard.",
            "Pan On Boarding",
            "warning"
          );
          this.message =
            "You are not onboarded for pan creation. Please onboard.";
          this.sts = "danger";
          this.showOnBoardingForm = true;
          this.getState();
        }
      },
      (err) => {
        this.message = err.error.message;
        this.sts = "danger";
      }
    );
  }
  onBoarding(form: NgForm) {
    this.http.post("uti/onboarding", form).subscribe(
      (res) => {
        if (res.response) {
          this.panOnboardingForm.reset;
          this.showOnBoardingForm = false;
          this.toast.showToast(res.message, "Pan Onboarding", "success");
        }
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  init() {
    this.sts = "success";
    this.message = "Sending data to UTI server.";
    this.http.get("uti/init").subscribe(
      (res) => {
        this.message = "Fetching data from UTI server.";
        if (res.response) {
          this.message = "Reading response.";
          if (res.data.StatusCode === "000") {
            this.message = "Creating url.";
            let data = res.data.Data[0];
            console.log(data);
            let url =
              "https://www.myutiitsl.com/panonlineservices/loginCheckin";
            //"http://203.153.46.10:8080/panonlineservices/loginCheckin";
            url =
              url +
              "?userHandle=" +
              data.userHandle +
              "&transId=" +
              data.transId +
              "&checksum=" +
              data.checksum +
              "&entityId=" +
              data.entityId;
            this.message = "Validating your url and redirect to UTI server...";
            this.closed = true;
            window.open(url, "_blank");
            /*  this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
              url 
            );*/
          } else {
            this.message = res.data.Message;
            this.sts = "danger";
            this.toast.showToast(res.data.Message, "Initiate", "warning");
          }
        } else {
          this.message = res.Message;
          this.sts = "danger";
          this.toast.showToast(res.message, "Initiate", "warning");
        }
      },
      (err) => {
        this.message = err.error.message;
        this.sts = "danger";
        this.toast.showToast(err.error.message, "Initiate", "danger");
      }
    );
  }

  get f() {
    return this.panOnboardingForm.controls;
  }
}
