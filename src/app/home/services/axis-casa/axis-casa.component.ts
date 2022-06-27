import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckfeaturesService } from '../../../services/checkfeatures.service';
import { HttpService } from '../../../services/http.service';
import { ToastrService } from '../../../services/toastr.service';

@Component({
  selector: 'ngx-axis-casa',
  templateUrl: './axis-casa.component.html',
  styleUrls: ['./axis-casa.component.scss']
})
export class AxisCasaComponent implements OnInit {
  axisCasa: any = "../../../../assets/images/accountstepbg.png";
  postData={
    type: Number
  };
  lodder:Boolean = true;
  constructor(
    private http: HttpService, 
    private toast: ToastrService, 
    private service: CheckfeaturesService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.checkOnboard();
  }

  init(){
    console.log(this.postData);
     this.http.post("axis/init",this.postData).subscribe(res =>{
      if(res.response){
        window.open(res.data.data);
      }else{
        this.toast.showToast(res.message,"CASA","warning")
      }
    },(err) =>{
      this.toast.showToast(err.error.message,"CASA","danger")
    })
  }

  checkOnboard() {
    this.lodder = true;
    if (this.service.isGiven(20)) {
      this.onboard();
    } else {
      this.toast.showToast("Feature not allowed", "Feature", "warning");
      this.router.navigateByUrl("/dashboard");
    }
  }
  onboard() {
    this.http.post("axis/onboard", {}).subscribe((res) => {
      if (res.response) {
        this.lodder = false;
      } else {
        this.toast.showToast("Feature not allowed", "Feature", "warning");
        this.router.navigateByUrl("/dashboard");
      }
    });
  }

}
