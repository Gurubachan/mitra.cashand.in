import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbDialogService } from "@nebular/theme";

import { Data, LicFetchResponse } from '../../../@model/utility/licFetchResponse';
import { CheckfeaturesService } from '../../../services/checkfeatures.service';
import { HttpService } from '../../../services/http.service';
import { LocationService } from '../../../services/location.service';
import { ToastrService } from '../../../services/toastr.service';
import { LicReceiptComponent } from '../../component/lic-receipt/lic-receipt.component';

@Component({
  selector: 'ngx-lic',
  templateUrl: './lic.component.html',
  styleUrls: ['./lic.component.scss']
})
export class LicComponent implements OnInit {
  data: Data= null;
  loading: boolean = false;
  submitted: boolean = false;
  viewPolicy: boolean = false;
  payPolicy: boolean = false;
  licForm: FormGroup;
  licPaymentForm: FormGroup;
  balance: Number = 0;
  dialogRef;
  constructor( private locationService: LocationService,
    private http: HttpService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toast: ToastrService,
    private dialogService: NbDialogService,
    private features: CheckfeaturesService
    ) { }

  ngOnInit(): void {
    if (!this.features.isGiven(18)) {
      this.toast.showToast("Feature not allowed", "Feature", "warning");
      this.router.navigateByUrl("/dashboard");
    }
    this.location();
    this.licForm= this.formBuilder.group({
      contact: [null,[Validators.required, Validators.pattern("[6-9]{1}[0-9]{9}")]],
      policyNumber:[null, [Validators.required, Validators.pattern("^[0-9]{7,10}$")]],
      emailId:[null, [Validators.required,Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]]
    });

    this.licPaymentForm=this.formBuilder.group({
      contact: [null,[Validators.required, Validators.pattern("[6-9]{1}[0-9]{9}")]],
      policyNumber:[null, [Validators.required, Validators.pattern("^[0-9]{7,10}$")]],
      emailId:[null, [Validators.required,Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]],
      longitude: [null, Validators.required],
      latitude: [null, Validators.required],
      billFetch: [null, Validators.required],
      amount: [null, [Validators.required]]
    });
  }

  get f() {
    return this.licForm.controls;
  }
  get lf() {
    return this.licPaymentForm.controls;
  }

  checkPolicy(form: NgForm) {
    this.loading=true;
    this.http.post("lic/fetch", form).subscribe((res: LicFetchResponse)=>{
      if(res.response){
        this.data=res.data
        if(this.data.status){
          this.viewPolicy=true;
        }else{
          this.toast.showToast(this.data.message,"LIC","warning");
          this.licForm.reset();
        }
        this.loading=false;
      }else{
        this.toast.showToast(res.message,"LIC","warning");
        this.loading=false;
      }
      
    },error=>{
      this.toast.showToast(error.error.message,"LIC","danger");
      this.loading=false;
      this.viewPolicy=false;
    });
  }

  proceedPayment(){
    this.loading=true;
    this.licPaymentForm.get("contact").setValue(this.f.contact.value);
    this.licPaymentForm.get("emailId").setValue(this.f.emailId.value);
    this.licPaymentForm.get("policyNumber").setValue(this.f.policyNumber.value);
    this.licPaymentForm.get("amount").setValue(Number(this.data.amount).toFixed(2));
    this.licPaymentForm.get("billFetch").setValue(this.data.bill_fetch);
    
    //console.log(this.licForm.controls.contact.value);
    this.walletBalance();
    console.log(this.licPaymentForm.value);
    this.validateAmount();
    this.payPolicy=true;
    this.loading=false;
}

  initPayment(form: NgForm) {
    this.loading=true;
    console.log(form);
     this.http.post("lic/pay", form).subscribe(res => {
      if(res.response){
         this.dialogRef = this.dialogService.open(LicReceiptComponent,{ 
                context: {
                  title: "Lic Payment Receipt",
                  data: res.data,
                },
              }
            );
            this.toast.showToast(
              "Transaction Successfull",
              "Lic Payment",
              "success"
            );
            this.loading=false;
    }else{
        this.dialogRef = this.dialogService.open(LicReceiptComponent,{ 
                context: {
                  title: "Lic Payment Receipt",
                  data: res.data,
                },
              }
            );
            this.toast.showToast(
              "Transaction Successfull",
              "Lic Payment",
              "warning"
            );
            this.loading=false;
    }

    this.licForm.reset()
    this.licPaymentForm.reset();
     this.data=null;
     this.payPolicy=false;
     this.viewPolicy=false;
  },(error) => {
this.toast.showToast(
              error.error.message,
              "Lic Payment",
              "danger"
            );
  });
  this.loading=false;
  }

  location() {
    this.locationService.getPosition().then((pos) => {
      this.licPaymentForm.get("latitude").setValue(pos.lat);
      this.licPaymentForm.get("longitude").setValue(pos.lat);
    });
  }

  walletBalance() {
    this.loading = true;
    this.balance = 0;
    this.http.post("wallet/myBalance", null).subscribe(
      (result) => {
        this.balance = result.data.balance;
        this.loading = false;
      },
      (err) => {
        console.log(err);
        this.loading = false;
      }
    );
  }

  validateAmount(){
    console.log(parseFloat(this.lf.amount.value));
    if(parseFloat(this.lf.amount.value) > this.balance){
      this.lf.amount.setErrors({ inValidAmount: true });
    }
    console.log(this.lf.amount.value);
  }
  

}
