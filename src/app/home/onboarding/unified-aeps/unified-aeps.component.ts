import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MerchantInfo } from '../../../@model/unifiedAeps/onboardMerchantInfo';
import { HttpService } from '../../../services/http.service';
import { ToastrService } from '../../../services/toastr.service';

@Component({
  selector: 'ngx-unified-aeps',
  templateUrl: './unified-aeps.component.html',
  styleUrls: ['./unified-aeps.component.scss']
})
export class UnifiedAepsComponent implements OnInit {
  onboardingForm: FormGroup;
  submitted: boolean = false;
  constructor(
    private http: HttpService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toast: ToastrService
  ) { 
    this.onboardingForm = this.formBuilder.group({
      mobilenumber: ["", Validators.required],
      fname: ["", Validators.required],
      mname: [""],
      lname: ["", Validators.required],
      pancard: ["", Validators.required],
      aadhaarId: ["", Validators.required],
      companyname: ["", Validators.required],
      address: ["", Validators.required],
      area: ["", Validators.required],
      pincode: ["", Validators.required],
      shopname: ["", Validators.required],
      shopcity: ["", Validators.required],
      shopaddress: ["", Validators.required],
      shopdistrict: ["", Validators.required],
      shoppincode: ["", Validators.required],
      shoparea: ["", Validators.required],
      shopstate: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.http.get("aeps/merchantIfo").subscribe((res:MerchantInfo) =>{
      console.warn(res);
      if(res.response){
        let data=res.data;

      this.onboardingForm.get("fname").setValue(data.fname);
      this.onboardingForm.get("mname").setValue(data.mname);
      this.onboardingForm.get("lname").setValue(data.lname);
      this.onboardingForm.get("mobilenumber").setValue(data.mobilenumber);
      this.onboardingForm.get("pancard").setValue(data.pancard);
      this.onboardingForm.get("aadhaarId").setValue(data.aadhaarId);
      this.onboardingForm.get("companyname").setValue(data.companyname);
      this.onboardingForm.get("address").setValue(data.address);
      this.onboardingForm.get("area").setValue(data.area);
      this.onboardingForm.get("pincode").setValue(data.pincode);
      this.onboardingForm.get("shopname").setValue(data.shopname);
      this.onboardingForm.get("shopcity").setValue(data.shopcity);
      this.onboardingForm.get("shopaddress").setValue(data.shopaddress);
      this.onboardingForm.get("shopdistrict").setValue(data.shopdistrict);
      this.onboardingForm.get("shoppincode").setValue(data.shoppincode);
      this.onboardingForm.get("shoparea").setValue(data.shoparea);
      this.onboardingForm.get("shopstate").setValue(data.shopstate);
      }
      
    })
  }

  aepsNewOnboarding(form: NgForm) {
    this.http.post("aeps/onboard", form).subscribe(
      (res) => {
        if (res.response) {
          console.log(res);
          this.toast.showToast(res.message, "Onboarding", "success");
          this.onboardingForm.reset;
          this.router.navigateByUrl("/dashboard")
        } else {
          console.log(res);
          this.toast.showToast(res.message, "Onboarding", "danger");
          this.onboardingForm.reset;
          this.router.navigateByUrl("/dashboard")
        }
      },
      (err) => {
        this.toast.showToast(err.error.message, "Onboarding", "danger");
        this.onboardingForm.reset;
        this.router.navigateByUrl("/dashboard")
      }
    );
  }

  get f() {
    return this.onboardingForm.controls;
  }

}
