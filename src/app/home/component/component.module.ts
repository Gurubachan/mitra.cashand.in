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
  NbToggleModule,
} from "@nebular/theme";
import { DialogComponent } from "./dialog/dialog.component";
import { KycdialogComponent } from "./kycdialog/kycdialog.component";
import { OnboardingModule } from "../onboarding/onboarding.module";
import { VerifyComponent } from "./verify/verify.component";
import { ServiceListComponent } from "../services/service-list/service-list.component";

@NgModule({
  declarations: [
    AboutComponent,
    KycComponent,
    BankComponent,
    DialogComponent,
    KycdialogComponent,
    VerifyComponent,
    ServiceListComponent,
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
  ],
  exports: [
    AboutComponent,
    KycComponent,
    BankComponent,
    VerifyComponent,
    ServiceListComponent,
  ],
})
export class ComponentModule {}
