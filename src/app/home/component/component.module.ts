import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AboutComponent } from "./about/about.component";
import { KycComponent } from "./kyc/kyc.component";
import { BankComponent } from "./bank/bank.component";
import { FormsModule } from "@angular/forms";
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbSpinnerModule,
  NbToggleModule,
  NbUserModule,
} from "@nebular/theme";
import { DialogComponent } from "./dialog/dialog.component";
import { KycdialogComponent } from "./kycdialog/kycdialog.component";
import { OnboardingModule } from "../onboarding/onboarding.module";
import { VerifyComponent } from "./verify/verify.component";
import { ServiceListComponent } from "../services/service-list/service-list.component";
import { MoreviewComponent } from "./popover/moreview/moreview.component";
import { ReferralComponent } from "./referral/referral.component";
import { RbpTransactionDialogComponent } from "./rbp-transaction-dialog/rbp-transaction-dialog.component";
import { UpiComponent } from './popover/upi/upi.component';
import { MoneyTransactionResponseDialogComponent } from './money-transaction-response-dialog/money-transaction-response-dialog.component';
import { LicReceiptComponent } from "./lic-receipt/lic-receipt.component";
import { RemarkDialogComponent } from './dialog/remark-dialog/remark-dialog.component';
import { UpiMappingDialogComponent } from './dialog/upi-mapping-dialog/upi-mapping-dialog.component';
import { BeneVerificationDialogComponent } from './dialog/bene-verification-dialog/bene-verification-dialog.component';
import { AepsTransactionDialogComponent } from './aeps-transaction-dialog/aeps-transaction-dialog.component';
import { ApiMoreViewComponent } from './popover/api-more-view/api-more-view.component';
@NgModule({
  declarations: [
    AboutComponent,
    KycComponent,
    BankComponent,
    DialogComponent,
    KycdialogComponent,
    VerifyComponent,
    ServiceListComponent,
    MoreviewComponent,
    ReferralComponent,
    RbpTransactionDialogComponent,
    UpiComponent,
    MoneyTransactionResponseDialogComponent,
    LicReceiptComponent,
    RemarkDialogComponent,
    UpiMappingDialogComponent,
    BeneVerificationDialogComponent,
    AepsTransactionDialogComponent,
    ApiMoreViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NbInputModule,
    NbAlertModule,
    NbButtonModule,
    NbSelectModule,
    NbDatepickerModule,
    NbIconModule,
    NbCardModule,
    NbToggleModule,
    NbCheckboxModule,
    OnboardingModule,
    NbUserModule,
    NbSpinnerModule,

  ],
  exports: [
    AboutComponent,
    KycComponent,
    BankComponent,
    VerifyComponent,
    ServiceListComponent,
    ReferralComponent,
  ],
})
export class ComponentModule {}
