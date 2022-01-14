import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { DTH, Mobile, Operator } from "../../../@model/recharge/operator";
import { CheckfeaturesService } from "../../../services/checkfeatures.service";
import { HttpService } from "../../../services/http.service";
import { ToastrService } from "../../../services/toastr.service";

@Component({
  selector: "ngx-recharge",
  templateUrl: "./recharge.component.html",
  styleUrls: ["./recharge.component.scss"],
})
export class RechargeComponent implements OnInit {
  mob: Mobile[] = [];
  dth: DTH[] = [];
  operator: Operator = null;
  data: any = null;
  subscription: String = "Recharge Number";
  rechargeForm: FormGroup;
  submitted: boolean = false;
  modeShow: boolean = false;

  constructor(
    private http: HttpService,
    private formBuilder: FormBuilder,
    private features: CheckfeaturesService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.features.isGiven(3)) {
      this.getOperator();
    } else {
      this.toast.showToast("Feature not allowed", "Feature", "warning");
      this.router.navigateByUrl("/dashboard");
    }
    this.rechargeForm = this.formBuilder.group({
      type: [null, Validators.required],
      operator: [null, Validators.required],
      customerNumber: [null, Validators.required],
      //refMobileNo: [null, Validators.required],
      amount: [null, Validators.required],
      isStv: [0, Validators.required],
    });
  }

  initRecharge(form: NgForm) {
    this.submitted = true;
    this.http.post("recharge/transaction", form).subscribe((res) => {
      console.log(res);
      if (res.response) {
        this.toast.showToast(res.message, "Transaction Initiated", "success");
      } else {
        this.toast.showToast(res.message, "Transaction Failed", "danger");
      }
      this.rechargeForm.reset();
      this.submitted = false;
    });
  }

  getOperator() {
    this.http.get("recharge/operator").subscribe(
      (res: Operator) => {
        if (res.response) {
          this.operator = res;
          for (let i = 0; i < res.data.length; i++) {
            if (this.operator.data[i].recharge_type == "Mobile") {
              this.mob.push(this.operator.data[i]);
            }

            if (this.operator.data[i].recharge_type == "DTH") {
              this.dth.push(this.operator.data[i]);
            }
          }
        } else {
          this.toast.showToast(res.message, "Recharge", "danger");
        }
      },
      (error) => {
        this.toast.showToast(error.error.message, "Recharge", "warning");
      }
    );
  }

  rechargeTypeChange(e) {
    if (e == "Mobile") {
      console.log(this.mob);
      this.data = this.mob;
      this.subscription = "Recharge Number";
    } else {
      this.data = this.dth;
      this.subscription = "Cosumer Id";
    }
  }

  operatorChange(e) {
    if (e == 2) {
      this.modeShow = true;
    } else {
      this.modeShow = false;
    }
  }

  get f() {
    return this.rechargeForm.controls;
  }
}
