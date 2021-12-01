import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { CheckfeaturesService } from "../../../services/checkfeatures.service";
import { HttpService } from "../../../services/http.service";
import { LocationService } from "../../../services/location.service";
import { ToastrService } from "../../../services/toastr.service";
import { RbpTransactionDialogComponent } from "../../component/rbp-transaction-dialog/rbp-transaction-dialog.component";
const validator = require("aadhaar-validator");
var convert = require("xml-js");
/* declare function CaptureAvdm();
declare function CaptureMorpho(); */
declare function CaptureAvdmNew();
@Component({
  selector: "ngx-aepsnew",
  templateUrl: "./aepsnew.component.html",
  styleUrls: ["./aepsnew.component.scss"],
})
export class AepsnewComponent implements OnInit {
  loading: boolean = false;
  fingureScanning: boolean = false;
  options: Object[];
  transactionAeps: Object[];
  submitted: boolean = false;

  aepsForm: FormGroup;
  hideTxnAmount: boolean = false;
  deviceList: object[];
  scanMessage: String = "Click on fingure print.";
  fingureScanStrength: Number = 0;
  fingureOpacity: any = 0.1;
  dialogRef;
  constructor(
    private locationService: LocationService,
    private http: HttpService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toast: ToastrService,
    private dialogService: NbDialogService,
    private features: CheckfeaturesService
  ) {
    this.location();

    this.transactionAeps = [
      { key: "BE", value: "Balance Enquery" },
      { key: "MS", value: "Mini Statement" },
      { key: "CW", value: "Cash Withdrawal" },
    ];
  }

  ngOnInit(): void {
    if (this.features.isGiven(16)) {
      this.checkUserOnboard();
    } else {
      this.toast.showToast("Feature not allowed", "Feature", "warning");
      this.router.navigateByUrl("/dashboard");
    }

    this.aepsForm = this.formBuilder.group({
      aadhaarNumber: [
        null,
        [Validators.required, Validators.pattern("[2-9]{1}[0-9]{11}")],
      ],
      bankList: [null, Validators.required],
      txnType: [null, Validators.required],
      txnAmount: [null, Validators.required],
      customerContact: [null, Validators.required],
      customerName: [null, Validators.required],
      customerPin: [null, Validators.required],
      customerFingerPrint: [null, Validators.required],
      longitude: [null, Validators.required],
      latitude: [null, Validators.required],
      customerId: null,
      txnMedium: ["web", Validators.required],
    });
  }

  aadhaarAtm(form: NgForm) {
    this.location();
    this.submitted = true;
    this.http.post("rbp/aepsTransaction", form).subscribe(
      (res) => {
        if (res.response) {
          this.toast.showToast(res.message, "Transaction Success", "success");
          this.fingureScanStrength = 0;

          this.aepsForm.reset();
          this.fingureOpacity = "0.1";
        } else {
          this.aepsForm.reset();
          this.fingureScanStrength = 0;
          this.toast.showToast(res.message, "Transaction Failed", "danger");
          this.fingureOpacity = "0.1";
        }
        this.dialogRef = this.dialogService.open(
          RbpTransactionDialogComponent,
          {
            context: {
              title: "Transaction Report",
              data: res.data,
            },
          }
        );
        this.submitted = false;
        this.newCustomer = false;
        //console.log(this.aepsForm.value);
      },
      (err) => {
        //window.location.reload();
        this.aepsForm.reset();
        this.fingureScanStrength = 0;
        this.toast.showToast(err.error.message, "Server Issue", "danger");
        this.submitted = false;
        this.newCustomer = false;
        this.fingureOpacity = "0.1";
      }
    );
  }

  location() {
    this.locationService.getPosition().then((pos) => {
      this.aepsForm.get("latitude").setValue(pos.lat);
      this.aepsForm.get("longitude").setValue(pos.lng);
      /* this.aadhaarService.latitude = pos.lat;
      this.aadhaarService.longitude = pos.lng; */
    });
  }
  checkAadhar(e) {
    if (e != null && e.length == 12 && !validator.isValidNumber(e)) {
      this.aepsForm.controls.aadhaarNumber.setErrors({ invalidNumber: true });
    }
  }
  validateAmount(e) {
    if (e > 10000) {
      this.aepsForm.get("txnAmount").setValue(10000);
    }
  }
  getBankIIN() {
    this.loading = true;
    this.http.get("rbp/bank").subscribe(
      (result: any) => {
        if (result.response) {
          this.options = result.data;
          // console.log(this.options);
          this.loading = false;
        } else {
          console.log("Else part execute");
          this.loading = false;
        }
      },
      (err) => {
        console.log(err.error.message);
        this.loading = false;
      }
    );
  }
  txnTypeChange(e) {
    //console.log(e);
    if (e == "CW") {
      this.aepsForm.get("txnAmount").setValidators([Validators.required]);
      this.aepsForm.get("txnAmount").updateValueAndValidity();
      this.hideTxnAmount = true;
    } else {
      this.aepsForm.get("txnAmount").setValue(0);
      this.aepsForm.get("txnAmount").clearValidators();
      this.aepsForm.get("txnAmount").updateValueAndValidity();
      this.hideTxnAmount = false;
    }
  }
  data: any = null;
  // capture() {
  //   this.fingureScanning = true;
  //   this.fingureOpacity = "0.1";
  //   this.location();
  //   this.aepsForm.get("txnMedium").setValue("web");
  //   this.data = "";

  //   let deviceName = this.aepsForm.get("deviceList").value;
  //   this.fingureScanStrength = 0;
  //   this.scanMessage = "Place customer fingure in biometric device";
  //   //console.log(deviceName);

  //   if (deviceName == "morpho") {
  //     CaptureMorpho()
  //       .then((result: any) => {
  //         //console.log(result);

  //         this.data = result;
  //         this.checkAndClose();
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         this.fingureScanStrength = 0;
  //         this.scanMessage = "Device Not Connected";
  //         this.aepsForm.controls.deviceList.setErrors({
  //           invalidNumber: true,
  //         });
  //         this.fingureScanning = false;
  //       });
  //     /*  CaptureMorphoNew()
  //       .then((result) => {
  //         console.log(result);
  //         this.data = result;
  //         this.checkAndClose();
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         this.fingureScanStrength = 0;
  //         this.scanMessage = "Device Not Connected";
  //         this.aepsForm.controls.deviceList.setErrors({
  //           invalidNumber: true,
  //         });
  //         this.fingureScanning = false;
  //       }); */
  //   } else if (deviceName == "mantra") {
  //     CaptureAvdm()
  //       .then((result) => {
  //         //console.log(result);
  //         if (result.httpStaus) {
  //           this.data = result.data.replace('<?xml version="1.0"?>', "").trim();
  //           this.checkAndClose();
  //         }
  //       })
  //       .catch((err) => {
  //         this.fingureScanning = false;
  //         this.fingureScanStrength = 0;
  //         this.scanMessage = "Device Not Connected";
  //         this.aepsForm.controls.deviceList.setErrors({ invalidNumber: true });
  //       });
  //   } else {
  //     this.scanMessage = "No biometric device selected";
  //     this.aepsForm.controls.deviceList.setErrors({ invalidNumber: true });
  //     this.fingureScanning = false;
  //   }

  //   //console.log(this.aepsForm.value);
  // }
  CaptureNew() {
    if (this.fingureScanning != true) {
      this.fingureScanning = true;
      this.fingureOpacity = "0.1";

      this.aepsForm.get("txnMedium").setValue("web");
      this.data = "";
      this.fingureScanStrength = 0;
      this.scanMessage = "Place customer fingure in biometric device";
      this.location();
      CaptureAvdmNew()
        .then((result) => {
          if (result.response) {
            if (typeof result.data == "string") {
              this.data = result.data
                .replace('<?xml version="1.0"?>', "")
                .trim();
              this.checkAndClose();
            } else {
              this.data = result.data;
              this.checkAndClose();
            }
          } else {
            this.scanMessage = result.message;
            /*  this.aepsForm.controls.deviceList.setErrors({
            invalidNumber: true,
          }); */
            this.fingureScanning = false;
          }
        })
        .catch((err) => {
          this.fingureScanStrength = 0;
          this.scanMessage = err.message;
          /* this.aepsForm.controls.deviceList.setErrors({
          invalidNumber: true,
        }); */
        });
      this.fingureScanning = false;
    }
  }
  checkAndClose() {
    this.fingureScanning = true;
    let options = {
      compact: true,
      spaces: 4,
    };
    console.log(this.data.length);
    if (this.data != "undefined" && this.data != null && this.data.length > 0) {
      let Result = convert.xml2json(this.data, options);
      var obj = JSON.parse(Result);

      const response = obj.PidData.Resp._attributes;
      if (response.errCode == 0) {
        this.fingureScanStrength = parseInt(
          response.qScore.replace(/\\n/g, "")
        );
        //console.log(this.fingureScanStrength);
        this.aepsForm.get("customerFingerPrint").setValue(btoa(this.data));
        this.scanMessage = "Scaning Completed";

        let op = this.fingureScanStrength.valueOf() / 100;
        this.fingureOpacity = op;
        this.fingureScanning = false;
      } else {
        this.scanMessage = response.errInfo;
        this.fingureScanStrength = 0;
        this.fingureScanning = false;
        this.fingureOpacity = "0.1";
      }
    } else {
      this.fingureScanning = false;
    }
    this.fingureScanning = false;
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.aepsForm.controls;
  }
  displayAepsForm: boolean = false;
  checkUserOnboard() {
    this.http.post("services/checkMyService", { serviceId: 16 }).subscribe(
      (res) => {
        if (res.response) {
          let rbpAespService;
          rbpAespService = res.data[0];
          // console.log(rbpAespService);
          if (
            rbpAespService.status_code == "A" &&
            rbpAespService.onBoardReferance != "" &&
            rbpAespService.onboardStatus == "active"
          ) {
            this.getBankIIN();
            this.displayAepsForm = true;
          } else {
            this.displayAepsForm = false;
            this.toast.showToast(res.message, "Service", "warning");
            this.router.navigateByUrl("/onboarding/aepsnew");
          }
        } else {
          this.toast.showToast(res.message, "Service", "warning");
          this.router.navigateByUrl("/dashboard");
        }
      },
      (err: any) => {
        this.toast.showToast(err.error.message, "Service", "danger");
      }
    );
  }
  newCustomer: boolean = false;
  checkingNewCustomer: boolean = false;
  checkCustomer(e) {
    //console.log(e.length);
    if (e != null && e.length == 10) {
      const contact = this.aepsForm.controls["customerContact"];
      if (!contact.errors?.pattern) {
        this.checkingNewCustomer = true;
        this.http.post("rbp/customer", { contact: e }).subscribe(
          (res) => {
            if (res.response) {
              let data = res.data[0];
              this.aepsForm.get("customerId").setValue(data.rbpCustomerId);
              this.aepsForm
                .get("customerId")
                .setValidators([Validators.required]);
              this.newCustomer = false;
              this.checkingNewCustomer = false;
              this.aepsForm.get("customerName").clearValidators();
              this.aepsForm.get("customerPin").clearValidators();
            } else {
              this.newCustomer = true;
              this.checkingNewCustomer = false;
              this.aepsForm.get("customerId").clearValidators();
              this.aepsForm
                .get("customerName")
                .setValidators([Validators.required]);
              this.aepsForm
                .get("customerPin")
                .setValidators([Validators.required]);
            }
            this.aepsForm.get("customerName").updateValueAndValidity();
            this.aepsForm.get("customerPin").updateValueAndValidity();
            this.aepsForm.get("customerId").updateValueAndValidity();
          },
          (err) => {
            console.log(err);
            this.checkingNewCustomer = false;
          }
        );
      } else {
        this.newCustomer = false;
      }
    } else {
      this.newCustomer = false;
    }
  }
}
