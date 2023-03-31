import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { Data } from '../../../../@model/athenticate/auth';
import { CohortResponse } from '../../../../@model/loans/cohorts/cohortResponse';
import { KycParam } from '../../../../@model/loans/kyc/kycRequest';
import { CheckfeaturesService } from '../../../../services/checkfeatures.service';
import { CostumehttpService } from '../../../../services/costumehttp.service';
import { HttpService } from '../../../../services/http.service';
import { ToastrService } from '../../../../services/toastr.service';

@Component({
  selector: 'ngx-happy-loans',
  templateUrl: './happy-loans.component.html',
  styleUrls: ['./happy-loans.component.scss']
})
export class HappyLoansComponent implements OnInit {
  crossAuth: Data;
  displayLoanDetailsForm: boolean=false;
  url:string;
  loading:boolean=false;
  endPoint={
    cohort:"merchant/cohort",
    status:"merchant/status",
    kyc:"merchant/create-loan"
  };
  application: CohortResponse=null;
  kycRequest:KycParam;

  @ViewChild("fileInputAadhaarFront", { static: false }) fileInputAadhaarFront: ElementRef;
  @ViewChild("fileInputAadhaarBack", { static: false }) fileInputAadhaarBack: ElementRef;
  @ViewChild("fileInputPan", { static: false }) fileInputPan: ElementRef;
  @ViewChild("fileInputImage", { static: false }) fileInputImage: ElementRef;

  img="../../../../assets/images/cloud-upload-outline.png";
  pan: any=this.img;
  aadhaarfront: any=this.img;
  aadhaarback: any=this.img;
  live: any=this.img;

  panimage: any = null;
  aadhaarimagefront: any = null;
  aadhaarimageback: any = null;
  liveImage: any = null;
  displayKycForm:boolean=false;
  showErrors:boolean=false;
  showMessage:string="";
  
  constructor(private http: HttpService, 
    private router: Router, 
    private toast: ToastrService,
    private features: CheckfeaturesService,
    private costumhttp: CostumehttpService,
    ) { 
      this.url=environment.loan;
    }

  ngOnInit(): void {
    this.loading=true;
    if (this.features.isGiven(23)) {
      this.status();
    } else {
      this.toast.showToast("Feature not allowed", "Feature", "warning");
      this.router.navigateByUrl("/dashboard");
    }
  }

  status(){
    this.loading=true;
    this.http.post("loan/status", { }).subscribe(
      (res) => {
        if (res.response) {
            this.authorize();
            this.displayLoanDetailsForm = true;
            
        } else {
          if(res.data.onboarded==0 && res.data.isActive==1){
            this.loading=false;
            this.router.navigateByUrl("/onboarding/self-loan-onboard");
           
          }else{
            this.loading=false;
            this.toast.showToast(res.message, "Service", "warning");
            this.router.navigateByUrl("/dashboard");

          }
        }
      },
      (err: any) => {
        this.toast.showToast(err.error.message, "Service", "danger");
        this.loading=false;
        this.router.navigateByUrl("/dashboard");
      }
    );
  }

  authorize() {
    this.loading=true;
    this.http.post("loan/authenticate", { }).subscribe(
      (res) => {
        if (res.response) {
         this.crossAuth=res.data;        
            this.displayLoanDetailsForm = true;
         this.cohort();
        } else {
          this.loading=false;
          this.toast.showToast(res.message, "Service", "warning");
          this.router.navigateByUrl("/dashboard");
        }
      },
      (err: any) => {
        this.loading=false;
        this.toast.showToast(err.error.message, "Service", "danger");
        this.router.navigateByUrl("/dashboard");
      }
    );
  }

  cohort(){
    this.loading=true;
    this.costumhttp.post(
      this.url+this.endPoint.cohort,
      this.crossAuth.passkey,
      {merchantId:this.crossAuth.merchantId}
      ).subscribe((res:CohortResponse)=>
    {
      
      console.log(res);
      this.application=res;
      this.loading=false;
    },(err)=>{
      this.loading=false;
    })
  }

  cohortStatus(){
    this.loading=true;
    this.costumhttp.post(
      this.url+this.endPoint.status,
      this.crossAuth.passkey,
      {merchantId:this.crossAuth.merchantId}
      ).subscribe((res: CohortResponse)=>
    {
      this.application=res;
      this.loading=false;
      window.open(this.application.data.offer_link, "_blank");
    },(err)=>{
      this.loading=false;
    })
  }

  kyc(){
    this.cohortStatus();
    this.displayKycForm=true; 
    
   
  }
  kycProcess(){
   
   
    this.kycRequest={
      merchantId:this.crossAuth.merchantId, 
      panImage:this.panimage, 
      aadhaarFront:this.aadhaarimagefront, 
      aadhaarBack:this.aadhaarimageback, 
      liveImage:this.liveImage,
      loanId:this.application.data.id
    };
    if(this.kycRequest.merchantId!=null && 
      this.kycRequest.panImage!=null && 
      this.kycRequest.aadhaarFront!=null && 
      this.kycRequest.aadhaarFront!=null &&
      this.kycRequest.aadhaarBack!=null &&
      this.kycRequest.liveImage!=null &&
      this.kycRequest.loanId!=null
      ){
        this.costumhttp.post(this.url+this.endPoint.kyc,this.crossAuth.passkey,this.kycRequest).subscribe((res)=>{
          this.toast.showToast(res.message,"KYC Process", "success")
        });
      }else{
          this.toast.showToast("KYC document not uploaded", "KYC Process","danger")
      }
    
  }
 
  selectImageSource(documentType: string) {
    if (documentType === "panimage") {
      this.fileInputPan.nativeElement.click();
    }
    if (documentType === "aadhaarimagefront") {
      this.fileInputAadhaarFront.nativeElement.click();
    }
    if (documentType === "aadhaarimageback") {
      this.fileInputAadhaarBack.nativeElement.click();
    }
    if (documentType === "liveImage") {
      this.fileInputImage.nativeElement.click();
    }
  }

  uploadFile(event: EventTarget, documentType: string) {
    const eventObj: MSInputMethodContext = event as MSInputMethodContext;
    const target: HTMLInputElement = eventObj.target as HTMLInputElement;
    const file: File = target.files[0];
    if (file.size / 1024 <= 200) {
      this.showErrors = false;
    let reader = new FileReader();
    reader.onload = (e) => {
      console.log(e.target.result);
      let image = e.target.result;

      if (documentType === "panimage") {
        this.panimage = image;
        this.pan=image;
       
      }
      if (documentType === "aadhaarimagefront") {
        this.aadhaarimagefront = image;
        this.aadhaarfront=image;
        
      }
      if (documentType === "aadhaarimageback") {
        this.aadhaarimageback = image;
        this.aadhaarback=image;
        
      }
      if (documentType === "liveImage") {
        this.liveImage = image;
        this.live=image;
        
      }
      
    };
    reader.readAsDataURL(file);
  }else{
    this.showErrors = true;
      this.showMessage = documentType +" size greater than 200 KB";
  }
  }

}
