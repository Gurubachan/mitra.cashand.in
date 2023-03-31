import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MerchantInfo } from '../../../../@model/unifiedAeps/onboardMerchantInfo';
import { HttpService } from '../../../../services/http.service';
import { LocationService } from '../../../../services/location.service';
import { ToastrService } from '../../../../services/toastr.service';

@Component({
  selector: 'ngx-happyloans',
  templateUrl: './happyloans.component.html',
  styleUrls: ['./happyloans.component.scss']
})
export class HappyloansComponent implements OnInit {
  onboardingForm: FormGroup;
  submitted: boolean = false;

 

  constructor(private http: HttpService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toast: ToastrService,
    private locationService: LocationService
    ) { 
      this.onboardingForm = this.formBuilder.group({
        mobilenumber: ["", Validators.required],
        fname: ["", Validators.required],
        mname: [""],
        lname: ["", Validators.required],
        pancard: ["", Validators.required],
        aadhaarId: ["", Validators.required],
        father: ["", Validators.required],

        landmark: ["", Validators.required],
        address: ["", Validators.required],
        city: ["", Validators.required],
        pincode: ["", Validators.required],
        state: ["", Validators.required],

        shopname: ["", Validators.required],
        shopcity: ["", Validators.required],
        shopaddress: ["", Validators.required],
        shoppincode: ["", Validators.required],
        shoparea: ["", Validators.required],
        shopstate: ["", Validators.required],
    
        latitude: ["", Validators.required],
        longitude: ["", Validators.required],

      });
    }

  ngOnInit(): void {
    this.getMerchantInfo();
  }

  getMerchantInfo() {
    this.http.get("loan/merchantInfo").subscribe((res:MerchantInfo)=>{
      if(res.response){
        let data=res.data;

      this.onboardingForm.get("fname").setValue(data.fname);
      this.onboardingForm.get("mname").setValue(data.mname);
      this.onboardingForm.get("lname").setValue(data.lname);
      this.onboardingForm.get("mobilenumber").setValue(data.mobilenumber);
      this.onboardingForm.get("pancard").setValue(data.pancard);
      this.onboardingForm.get("aadhaarId").setValue(data.aadhaarId);

      this.onboardingForm.get("landmark").setValue(data.companyname);
      this.onboardingForm.get("address").setValue(data.address);
      this.onboardingForm.get("city").setValue(data.area);
      this.onboardingForm.get("state").setValue(data.state);
      this.onboardingForm.get("pincode").setValue(data.pincode);

      this.onboardingForm.get("shopname").setValue(data.shopname);
      this.onboardingForm.get("shopcity").setValue(data.shopcity);
      this.onboardingForm.get("shopaddress").setValue(data.shopaddress);

      this.onboardingForm.get("shoppincode").setValue(data.shoppincode);
      this.onboardingForm.get("shoparea").setValue(data.shoparea);
      this.onboardingForm.get("shopstate").setValue(data.shopstate);
   
      }
      this.location();
    });
  }

  newOnboarding(form: NgForm) {
    this.submitted=true;
    this.http.post("loan/onboard", form).subscribe(
      (res) => {
        if (res.response) {
          console.log(res);
          this.toast.showToast(res.message, "Onboarding", "success");
          this.onboardingForm.reset;
          this.submitted=false;
          this.router.navigateByUrl("/dashboard")
        } else {
          console.log(res);
          this.toast.showToast(res.message, "Onboarding", "danger");
          this.onboardingForm.reset;
          this.submitted=false;
          this.router.navigateByUrl("/dashboard")
        }
      },
      (err) => {
        this.toast.showToast(err.error.message, "Onboarding", "danger");
        this.onboardingForm.reset;
        this.submitted=false;
        this.router.navigateByUrl("/dashboard")
      }
    );
  }

  location() {
    this.locationService.getPosition().then((pos) => {
      this.onboardingForm.get("latitude").setValue(pos.lat);
      this.onboardingForm.get("longitude").setValue(pos.lng);
    });
  }

  get f() {
    return this.onboardingForm.controls;
  }

}
