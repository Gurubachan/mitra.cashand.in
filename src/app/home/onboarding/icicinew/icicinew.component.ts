import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpService } from "../../../services/http.service";
import { ToastrService } from "../../../services/toastr.service";
var convert = require("xml-js");
declare function CaptureAvdm();
declare function CaptureMorpho();
@Component({
  selector: "ngx-icicinew",
  templateUrl: "./icicinew.component.html",
  styleUrls: ["./icicinew.component.scss"],
})
export class IcicinewComponent implements OnInit {
  aepsNewOnboardingForm: FormGroup;
  ekycOnboardingForm: FormGroup;
  loading: boolean = false;
  stateList: any;
  districtList: any;
  submitted: boolean = false;
  showOTPForm: boolean = false;
  fingureScanning: boolean = false;
  deviceList: any;
  fingureScanStrength: Number = 0;
  scanMessage: String = "";
  constructor(
    private http: HttpService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toast: ToastrService
  ) {
    this.deviceList = [
      { key: "morpho", value: "Morpho" },
      { key: "mantra", value: "Mantra" },
      { key: "startek", value: "Startek" },
    ];
  }

  ngOnInit(): void {
    this.checkOnboarding();
    this.getState();
    this.aepsNewOnboardingForm = this.formBuilder.group({
      shopName: ["", Validators.required],
      stateId: ["", Validators.required],
      districtId: ["", Validators.required],
    });
    this.ekycOnboardingForm = this.formBuilder.group({
      otp: ["", Validators.required],
      ekycPrimaryKeyId: ["", Validators.required],
      ekycTxnId: ["", Validators.required],
      fingerprintData: ["", Validators.required],
      deviceList: "",
      /* customerFingurePrint: [null, Validators.required], */
    });
  }
  getState() {
    this.loading = true;
    this.http.get("rbp/state").subscribe(
      (res) => {
        let result = res.data;
        if (result.isSuccess) {
          this.stateList = result.data;
          this.loading = false;
        } else {
          //alert(result.message);
          this.loading = false;
        }
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  getDistrict(e) {
    this.loading = true;
    this.http.post("rbp/district", { stateId: e }).subscribe(
      (res) => {
        let result = res.data;
        if (result.isSuccess) {
          this.districtList = result.data;
          this.loading = false;
        } else {
          this.loading = false;
        }
      },
      (err) => {
        this.loading = false;
      }
    );
  }
  checkOnboarding() {
    this.http.post("services/myStatus", { serviceId: 16 }).subscribe(
      (res) => {
        if (res.response) {
          this.toast.showToast(res.message, "Onboarding", "success");
          if (res.data[0].status_code == "PK" || res.data[0].status_code=="P") {
            this.initKYC();
            this.showOTPForm = true;
          }else{
            if(res.data[0].status_code == "A"){
               this.router.navigateByUrl("services/aepsNew");
            }else{
              this.toast.showToast("Please contact admin. Your KYC is Deactive or Reject", "EKYC Status", "warning");
               this.router.navigateByUrl("dashboard");
            }
          }
        } else {
          this.toast.showToast(res.message, "Onboarding", "danger");
        }
      },
      (err) => {
        this.toast.showToast(err.error.message, "Onboarding", "danger");
      }
    );
  }
  aepsNewOnboarding(form: NgForm) {
    this.http.post("rbp/merchantRegistration", form).subscribe(
      (res) => {
        if (res.response) {
          console.log(res);
          this.toast.showToast(res.message, "Onboarding", "success");
          this.aepsNewOnboardingForm.reset;

          this.showOTPForm = true;
        } else {
          console.log(res);
          this.toast.showToast(res.message, "Onboarding", "danger");
        }
      },
      (err) => {
        this.toast.showToast(err.error.message, "Onboarding", "danger");
      }
    );
  }

  initKYC() {
    this.http.post("rbp/initKYC", {}).subscribe(
      (response) => {
        if (response.response) {
          this.toast.showToast(response.message, "Onboarding", "success");
          this.ekycOnboardingForm
            .get("ekycPrimaryKeyId")
            .setValue(response.data.EkycPrimaryKeyId);
          this.ekycOnboardingForm
            .get("ekycTxnId")
            .setValue(response.data.EkycTxnId);
          this.checkTimer();
        } else {
          this.toast.showToast(response.message, "Onboarding", "danger");
        }
      },
      (err) => {
        this.toast.showToast(
          err.error.message,
          "Onboarding KYC Issue",
          "danger"
        );
      }
    );
  }
  resendOTP(form: NgForm) {
    //console.log(form);
    this.http.post("rbp/resendOtp", form).subscribe(
      (res) => {
        if (res.response) {
          this.ekycOnboardingForm
            .get("ekycPrimaryKeyId")
            .setValue(res.data.EkycPrimaryKeyId);
          this.ekycOnboardingForm.get("ekycTxnId").setValue(res.data.EkycTxnId);
          this.toast.showToast(res.message, "OTP successfully sent", "success");
          this.checkTimer();
        } else {
          this.toast.showToast(res.message, "OTP resend issue", "danger");
        }
      },
      (err) => {
        this.toast.showToast(err.error.message, "OTP resend issue", "danger");
      }
    );
  }

  ekycSubmit(form: NgForm) {
    this.http.post("rbp/eKycProcess", form).subscribe(
      (res) => {
        if (res.response) {
          this.toast.showToast(res.message, "EKYC Submission", "success");
          this.router.navigateByUrl("services/aepsNew");
        } else {
          this.toast.showToast(res.message, "EKYC Submission", "danger");
          this.router.navigateByUrl("/dashboard");
        }
      },
      (err) => {
        this.toast.showToast(
          err.error.message,
          "Unable to process EKYC",
          "danger"
        );
        this.router.navigateByUrl("/dashboard");
      }
    );
  }
  timer: number = 0;
  resendCount: number = 0;
  resend: boolean = false;
  checkTimer() {
    this.timer = 30;
    if (this.resendCount <= 3) {
      this.resend = false;
      const key = setInterval(() => {
        this.timer--;
      }, 1000);

      setTimeout(() => {
        clearInterval(key);
        this.resend = true;
        this.resendCount++;
      }, 30000);
    }
  }
  data: any = null;

  fingureOpacity: any = 0.1;
  async capture() {
    this.fingureScanning = true;
    this.fingureOpacity = "0.1";
    /* this.location(); */
    /* this.ekycOnboardingForm.get("txnMedium").setValue("web"); */
    this.data = "";

    let deviceName = this.ekycOnboardingForm.get("deviceList").value;
    this.fingureScanStrength = 0;
    this.scanMessage = "Place customer fingure in biometric device";
    //console.log(deviceName);

    if (deviceName == "morpho") {
      await CaptureMorpho()
        .then((result) => {
          //console.log(result);
          this.data = result;
          this.checkAndClose();
        })
        .catch((err) => {
          //console.log(err);
          this.fingureScanStrength = 0;
          this.scanMessage = "Device Not Connected";
          this.ekycOnboardingForm.controls.deviceList.setErrors({
            invalidNumber: true,
          });
          this.fingureScanning = false;
        });
    } else if (deviceName == "mantra") {
      CaptureAvdm()
        .then((result) => {
          //console.log(result);
          if (result.httpStaus) {
            this.data = result.data.replace('<?xml version="1.0"?>', "").trim();
            this.checkAndClose();
          }
        })
        .catch((err) => {
          //console.log(err);
          this.fingureScanning = false;
          this.fingureScanStrength = 0;
          this.scanMessage = "Device Not Connected";
          this.ekycOnboardingForm.controls.deviceList.setErrors({
            invalidNumber: true,
          });
        });
    } else {
      this.scanMessage = "No biometric device selected";
      this.ekycOnboardingForm.controls.deviceList.setErrors({
        invalidNumber: true,
      });
      this.fingureScanning = false;
    }

    //console.log(this.aepsForm.value);
  }

  checkAndClose() {
    this.fingureScanning = true;
    let options = {
      compact: true,
      spaces: 4,
    };
    //console.log(this.data);
    if (this.data != "undefined" && this.data != null && this.data.length > 0) {
      let Result = convert.xml2json(this.data, options);
      var obj = JSON.parse(Result);
      //console.log(obj);
      const response = obj.PidData.Resp._attributes;
      if (response.errCode == 0) {
        this.fingureScanStrength = parseInt(
          response.qScore.replace(/\\n/g, "")
        );
        //console.log(this.fingureScanStrength);
        this.ekycOnboardingForm
          .get("fingerprintData")
          .setValue(btoa(this.data));
        this.scanMessage = "Scaning Completed";
        this.fingureScanning = false;

        let op = this.fingureScanStrength.valueOf() / 100;
        this.fingureOpacity = op;
      } else {
        this.scanMessage = response.errInfo;
        this.fingureScanStrength = 0;
        this.fingureScanning = false;
        this.fingureOpacity = "0.1";
      }
    } else {
      this.fingureScanning = false;
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.aepsNewOnboardingForm.controls;
  }
  get ekyc() {
    return this.ekycOnboardingForm.controls;
  }
}
