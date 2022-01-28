import { Component, OnInit, ViewChild } from "@angular/core";
import { NgModel } from "@angular/forms";
import { Router } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { BankList } from "../../../@model/moneytransfer/BankList";
import { BeneCustomer } from "../../../@model/moneytransfer/BeneCustomer";
import { BeneResponse } from "../../../@model/moneytransfer/BeneResponse";
import { Customer } from "../../../@model/moneytransfer/Customer";
import { TransactionResponse } from "../../../@model/moneytransfer/TransactionResponse";
import { Datum, PinCode } from "../../../@model/zipcode/PinCode";
import { CheckfeaturesService } from "../../../services/checkfeatures.service";
import { EncryptdecryptService } from "../../../services/encryptdecrypt.service";
import { HttpService } from "../../../services/http.service";
import { ToastrService } from "../../../services/toastr.service";
import { MoneyTransactionResponseDialogComponent } from "../../component/money-transaction-response-dialog/money-transaction-response-dialog.component";

@Component({
  selector: "ngx-dmt",
  templateUrl: "./dmt.component.html",
  styleUrls: ["./dmt.component.scss"],
})
export class DmtComponent implements OnInit {
  errors: string[] = [];
  messages: string[] = [];
  submitted: boolean = false;
  showButton: boolean = false;
  otpForm: boolean = false;
  dmt: any = {};
  dmtCustomer: any = {};
  pinCodes: Datum[] = null;
  customer: Customer;
  isMobileVerified: boolean = true;
  showUserInfo: boolean = false;
  showBeneForm: boolean = false;
  showBeneList: boolean = false;
  addBeneButtonText: string = "Add Bene";
  bankList: BankList[] = null;
  bene: any = {};
  beneList: BeneCustomer[] = null;
  bankDetails: any = null;
  transaction: any = {};
  isBeneSelected: boolean = false;
  loading: boolean = false;
  dialogRef;
  balance: number = 0;
  selectedBene: BeneCustomer;
  constructor(
    private http: HttpService,
    private toast: ToastrService,
    private encdec: EncryptdecryptService,
    private dialogService: NbDialogService,
    private features: CheckfeaturesService,
    private router: Router
  ) {
    this.transaction.mode = 4;
  }

  ngOnInit(): void {
    this.bene.dcId = 0;
    this.transaction.amount = 100;
    this.checkOnboard();
  }

  checkOnboard() {
    this.loading = true;
    if (this.features.isGiven(2)) {
      this.onboard();
    } else {
      this.toast.showToast("Feature not allowed", "Feature", "warning");
      this.router.navigateByUrl("/dashboard");
    }
  }
  onboard() {
    this.http.post("dmt/onboard", {}).subscribe((res) => {
      if (res.response) {
        this.loading = false;
      } else {
        this.toast.showToast("Feature not allowed", "Feature", "warning");
        this.router.navigateByUrl("/dashboard");
      }
    });
  }
  checkCustomer(e) {
    this.showBeneForm = false;
    this.showBeneList = false;
    this.isBeneSelected = false;
    this.beneList = null;
    if (e.length == 10) {
      this.http.post("dmt/customer", this.dmt).subscribe((res) => {
        if (res.response) {
          this.customer = JSON.parse(this.encdec.decrypt(res.data));
          if (!this.customer.isMobileVerified) {
            console.log(this.customer);
            this.otpForm = true;
            this.showUserInfo = false;
            this.dmtCustomer.contact = this.customer.mobileNo;
            this.showButton = false;
          } else {
            this.showUserInfo = true;
            this.showButton = false;
            this.getBank();
          }
        } else {
          this.showButton = true;
          this.showUserInfo = false;
          this.otpForm = false;
        }
      });
    } else {
      this.showUserInfo = false;
      this.showButton = false;
      this.otpForm = false;
    }
  }
  checkPinCode(e) {
    if (e.length === 6) {
      this.http.get("pinCode/" + e).subscribe((result: PinCode) => {
        console.log(result);
        if (result.response) {
          this.pinCodes = result.data;
          /*  if (this.user.pincode !== "") {
            this.selectedPinCodeId = this.user.pincode;
            this.cd.detectChanges();
          } */
        }
      });
    }
  }
  onboardUser() {
    this.http.post("dmt/register", this.dmt).subscribe((res) => {
      this.customer = JSON.parse(this.encdec.decrypt(res.data));
      if (!this.customer.isMobileVerified) {
        this.otpForm = true;
        this.dmtCustomer.contact = this.customer.mobileNo;
        this.showUserInfo = false;
        this.showButton = false;
      }
    });
    this.isMobileVerified = false;

    console.log(this.dmt);
  }

  verify() {
    console.log(this.dmtCustomer);
    this.http.post("dmt/verify", this.dmtCustomer).subscribe((res) => {
      this.customer = JSON.parse(this.encdec.decrypt(res.data));
      if (this.customer.isMobileVerified) {
        this.otpForm = false;
        this.showUserInfo = true;
        this.showButton = false;
        this.getBank();
      }
    });
  }
  getBank() {
    this.http.post("dmt/bank", null).subscribe((res) => {
      if (res.response) {
        this.bankList = JSON.parse(this.encdec.decrypt(res.data));
        console.log(this.bankList);
      }
    });
  }
  getBeneList(id) {
    this.bene.dcId = id;
    this.http
      .post("dmt/bene", { customerId: id })
      .subscribe((res: BeneResponse) => {
        if (res.response) {
          this.beneList = JSON.parse(this.encdec.decrypt(res.data));
          console.warn(this.beneList);
          this.showBeneList = true;
        } else {
          this.showBeneForm = true;
        }
      });
  }
  showForm() {
    if (this.bene.dcId > 0) {
      if (this.showBeneForm) {
        this.addBeneButtonText = "Add Bene";
        this.showBeneForm = false;
        this.showBeneList = true;
      } else {
        this.addBeneButtonText = "Reset Form";

        this.showBeneForm = true;
        this.showBeneList = false;
      }
    }
  }
  addBene() {
    console.log(this.bene);
    this.http.post("dmt/registerBene", this.bene).subscribe(
      (res) => {
        if (res.response) {
          this.getBeneList(this.bene.dcId);
          this.showBeneForm = false;
          this.showBeneList = true;
          this.bene = {};

          this.toast.showToast(res.message, "Bene registration", "success");
        } else {
          this.toast.showToast(res.message, "Bene registration", "warning");
          this.bene = {};
        }
        this.bene.dcId = this.customer.id;
      },
      (err: any) => {
        console.log(err);
        this.toast.showToast(err.error.message, "Bene registration", "danger");
      }
    );
  }

  initTransaction() {
    if (this.transaction.beneId > 0) {
      this.loading = true;

      this.http
        .post("dmt/transaction", this.transaction)
        .subscribe((res: TransactionResponse) => {
          console.log(res);

          if (res.response) {
            this.dialogRef = this.dialogService.open(
              MoneyTransactionResponseDialogComponent,
              {
                context: {
                  title: "Transaction Report",
                  data: res.data,
                },
              }
            );
            this.toast.showToast(
              "Transaction successful",
              "Money Transfer",
              "success"
            );

            this.reset();
            this.bene = null;
          } else {
            this.toast.showToast(
              "Transaction initiated",
              "Money Transfer",
              "warning"
            );
            this.reset();
            this.bene = null;
          }
        });
    } else {
    }
  }

  selectIfsc(e) {
    for (let i = 0; i < this.bankList.length; i++) {
      if (e == this.bankList[i].id) {
        console.log(this.bankList[i]);
        this.bene.ifsc = this.bankList[i].ifsc;
        this.getIFSCDetails();
      }
    }
  }
  getIFSCDetails() {
    if (this.bene.ifsc.length == 11) {
      let url = "https://ifsc.razorpay.com/";
      fetch(url + this.bene.ifsc)
        .then((response) => response.json())
        .then((data) => (this.bankDetails = data));
    }
  }
  @ViewChild("amount") amountModel: NgModel;

  validateAmount(e) {
    console.log(parseInt(this.customer?.remainAmount, 10));
    if (parseInt(this.customer?.remainAmount, 10) >= 100) {
      if (e < 100 || e > parseInt(this.customer?.remainAmount, 10)) {
        this.amountModel.control.setErrors({ min: true, max: true });
      } else {
      }
    } else {
      this.amountModel.control.setErrors({ max: true });
    }
    if (e > this.balance) {
      this.amountModel.control.setErrors({ inValidAmount: true });
    }
  }

  selectBene(beneId: Number) {
    this.transaction.amount = 0;
    if (beneId > 0) {
      this.isBeneSelected = true;
      this.transaction.beneId = beneId;
      this.walletBalance();
      this.selectedBeneList(beneId);
    } else {
      this.toast.showToast(
        "Benficiary not selected for transaction.",
        "Money Trasnfer",
        "warning"
      );
    }

    console.log(beneId);
  }

  selectedBeneList(beneId: Number) {
    for (let i = 0; i < this.beneList.length; i++) {
      if (this.beneList[i].id === beneId) {
        this.selectedBene = this.beneList[i];
      }
    }
  }

  reset() {
    this.isBeneSelected = false;
    this.transaction.beneId = 0;
    this.transaction.amount = 0;
    this.loading = false;
    this.showUserInfo = false;
    this.showButton = false;
    this.otpForm = false;
    this.showBeneList = false;
  }

  walletBalance() {
    this.loading = true;
    this.balance = 0;
    this.http.post("wallet/myBalance", null).subscribe(
      (result) => {
        console.log(this.loading);
        this.balance = result.data.balance;
        this.loading = false;
      },
      (err) => {
        console.log(err);
        this.loading = false;
      }
    );
  }
}
