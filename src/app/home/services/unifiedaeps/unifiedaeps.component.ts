import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { environment } from '../../../../environments/environment';
import { Auth, Data } from '../../../@model/athenticate/auth';
import { BankList } from '../../../@model/bank/bankList';
import { AepsRequest } from '../../../@model/unifiedAeps/requestParam';
import { CheckfeaturesService } from "../../../services/checkfeatures.service";
import { CostumehttpService } from '../../../services/costumehttp.service';
import { HttpService } from "../../../services/http.service";
import { LocationService } from "../../../services/location.service";
import { ToastrService } from "../../../services/toastr.service";
import { AepsTransactionDialogComponent } from '../../component/aeps-transaction-dialog/aeps-transaction-dialog.component';

const validator = require("aadhaar-validator");
var convert = require("xml-js");
declare function CaptureAvdmNew();

@Component({
  selector: 'ngx-unifiedaeps',
  templateUrl: './unifiedaeps.component.html',
  styleUrls: ['./unifiedaeps.component.scss']
})
export class UnifiedaepsComponent implements OnInit {
  loading: boolean = false;
  fingureScanning: boolean = false;
  aepsForm: FormGroup;
  hideTxnAmount: boolean = false;
  submitted: boolean = false;
  scanMessage: String = "Click on fingure print.";
  fingureScanStrength: Number = 0;
  fingureOpacity: any = 0.1;
  displayAepsForm: boolean = false;
  bank: BankList;
  crossAuth: Data;
  url:String="";
  transactionAeps: Object[]; // transaction type object
  endPoint={
    bankList:"common/bank",
    cw:"aeps/cw",
    ap:"aeps/ap",
    be:"aeps/be",
    ms:"aeps/ms",
  };

  dialogRef;
  constructor(
    private locationService: LocationService,
    private http: HttpService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toast: ToastrService,
    private dialogService: NbDialogService,
    private features: CheckfeaturesService,
    private costumhttp: CostumehttpService,
  ) { 
    this.location();

    this.transactionAeps = [
      { key: "BE", value: "Balance Enquery" },
      { key: "MS", value: "Mini Statement" },
      { key: "CW", value: "Cash Withdrawal" },
      { key: "AP", value: "Aadhaar Pay" },
    ];
    this.url=environment.aeps;
    
  }

  ngOnInit(): void {

    //checking service available or not
    if (this.features.isGiven(22)) {
      this.status();
    } else {
      this.toast.showToast("Feature not allowed", "Feature", "warning");
      this.router.navigateByUrl("/dashboard");
    }
    //form initialize

    this.aepsForm = this.formBuilder.group({
      aadhaarNumber: [
        null,
        [Validators.required, Validators.pattern("[2-9]{1}[0-9]{11}")],
      ],
      bankList: [null, Validators.required],
      txnType: [null, Validators.required],
      txnAmount: [null, Validators.required],
      customerContact: [null, Validators.required],
      /* customerName: [null, Validators.required],
      customerPin: [null, Validators.required], */
      customerFingerPrint: [null, Validators.required],
      longitude: [null, Validators.required],
      latitude: [null, Validators.required],
      customerId: null,
      txnMedium: ["web", Validators.required],
    });
  }

  location() {
    this.locationService.getPosition().then((pos) => {
      this.aepsForm.get("latitude").setValue(pos.lat);
      this.aepsForm.get("longitude").setValue(pos.lng);
      /* this.aadhaarService.latitude = pos.lat;
      this.aadhaarService.longitude = pos.lng; */
    });
  }

  status(){
    this.http.post("aeps/status", { }).subscribe(
      (res) => {
        if (res.response) {
         this.crossAuth=res.data;        
            this.authorize();
            this.displayAepsForm = true;
        } else {
          if(res.data.onboarded==0 && res.data.isActive==1){
            this.router.navigateByUrl("/onboarding/aeps");
          
          }else{
            this.toast.showToast(res.message, "Service", "warning");
            this.router.navigateByUrl("/dashboard");
          }
        }
      },
      (err: any) => {
        this.toast.showToast(err.error.message, "Service", "danger");
        this.router.navigateByUrl("/dashboard");
      }
    );
  }

  authorize() {
    this.http.post("aeps/authenticate", { }).subscribe(
      (res) => {
        if (res.response) {
         this.crossAuth=res.data;        
            this.getBankIIN();
            this.displayAepsForm = true;
         
        } else {
          this.toast.showToast(res.message, "Service", "warning");
          this.router.navigateByUrl("/dashboard");
        }
      },
      (err: any) => {
        this.toast.showToast(err.error.message, "Service", "danger");
        this.router.navigateByUrl("/dashboard");
      }
    );
  }



  getBankIIN() {
    this.loading = true;
    this.costumhttp.get(this.url+this.endPoint.bankList, this.crossAuth.passkey).subscribe(
      (result: any) => {
        if (result.status) {
          this.bank = result.data;
           console.log(this.bank);
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
    if (e == "CW" || e == "AP") {
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

  validateAmount(e) {
    if (e > 10000) {
      this.aepsForm.get("txnAmount").setValue(10000);
    }
  }

  checkAadhar(e) {
    if (e != null && e.length == 12 && !validator.isValidNumber(e)) {
      this.aepsForm.controls.aadhaarNumber.setErrors({ invalidNumber: true });
    }
  }

  aadhaarAtm(form: NgForm) {
    this.location();
    this.submitted = true;
    let url=environment.aeps;
    switch(this.aepsForm.get('txnType')?.value){
      case "CW": {
        url=url+this.endPoint.cw;
        break;
      } 
      case "AP": {
        url=url+this.endPoint.ap;
        break;
      }
      case "MS": {
        url=url+this.endPoint.ms;
        break;
      }
      default :{
        url=url+this.endPoint.be;
        break;
      } 
    }
    let postData: AepsRequest;
    postData={
      merchantId: this.crossAuth.merchantId,
    mobileNo:this.aepsForm.get('customerContact')?.value,
    iin:this.aepsForm.get('bankList')?.value,
    aadhaarNumber:this.aepsForm.get('aadhaarNumber')?.value,
    amount:this.aepsForm.get('txnAmount')?.value,
    latLong:this.aepsForm.get('latitude')?.value+","+this.aepsForm.get('longitude')?.value,
    pidData:this.aepsForm.get('customerFingerPrint')?.value,
    platformType:"web",
    partnerRef:null,
    paramA:null,
    paramB:null
    };
     this.costumhttp.post(url,this.crossAuth.passkey, postData).subscribe(
      (res) => {
        if (res.status) {
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
          AepsTransactionDialogComponent,
          {
            context: {
              title: "Transaction Receipt",
              data: res.data,
            },
          }
        );  
        this.submitted = false;
        
        //console.log(this.aepsForm.value);
      },
      (err) => {
        console.warn(err.error);

        this.dialogRef = this.dialogService.open(
          AepsTransactionDialogComponent,
          {
            context: {
              title: "Transaction Receipt",
              data: err.error.data,
            },
          }
        );  

        this.aepsForm.reset();
        this.fingureScanStrength = 0;
        this.toast.showToast(err.error.message, "Server Issue", "danger");
        this.submitted = false;
        
        this.fingureOpacity = "0.1";
      }
    ); 
  }

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
  data: any = null;
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

  checkCustomer(e){}

  get f() {
    return this.aepsForm.controls;
  }
}
