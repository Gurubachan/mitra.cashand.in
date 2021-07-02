import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpService } from "../../../services/http.service";
import { ToastrService } from "../../../services/toastr.service";
var convert = require("xml-js");
declare function CaptureAvdm();
declare function CaptureMantra();
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
      deviceList: [null, Validators.required],
      customerFingurePrint: [null, Validators.required],
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
  aepsNewOnboarding(form: NgForm) {
    this.http.post("rbp/merchantRegistration", form).subscribe(
      (res) => {
        if (res.response) {
          console.log(res);
          this.toast.showToast(res.message, "Onboarding", "Success");
          this.aepsNewOnboardingForm.reset;
          this.showOTPForm = true;
          this.ekycOnboardingForm
            .get("ekycPrimaryKeyId")
            .setValue(res.data.ekycPrimaryKeyId);
          this.ekycOnboardingForm.get("ekycTxnId").setValue(res.data.ekycTxnId);
        } else {
          console.log(res);
          this.toast.showToast(res.message, "Onboarding", "Danger");
        }
      },
      (err) => {
        this.toast.showToast(err.error.message, "Onboarding", "Danger");
      }
    );
  }

  data: any = null;
  async capture() {
    this.data = "";
    this.fingureScanning = true;
    let deviceName = this.ekycOnboardingForm.get("deviceList").value;
    this.fingureScanStrength = 0;
    this.scanMessage = "Place customer fingure in biometric device";
    //console.log(deviceName);
    if (deviceName == "mantra") {
      let response = await CaptureAvdm();
      if (response.httpStaus) {
        this.data = response.data.replace('<?xml version="1.0"?>', "").trim();
        this.checkAndClose();
      }
    }
    if (deviceName == "morpho") {
      this.data = await CaptureMantra();
      this.checkAndClose();
    }

    if (deviceName == null) {
      this.scanMessage = "No biometric device selected";
      this.ekycOnboardingForm.controls.deviceList.setErrors({
        invalidNumber: true,
      });
      this.fingureScanning = false;
    }
  }

  checkAndClose() {
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
          .get("customerFingurePrint")
          .setValue(btoa(this.data));
        this.fingureScanning = false;
        this.scanMessage = "Scan Complete";
      } else {
        this.fingureScanning = false;
        this.scanMessage = response.errInfo;
        this.fingureScanStrength = 0;
      }
    }
  }

  ekycSubmit(form: NgForm) {
    console.log(form);
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.aepsNewOnboardingForm.controls;
  }
  get ekyc() {
    return this.ekycOnboardingForm.controls;
  }
}
