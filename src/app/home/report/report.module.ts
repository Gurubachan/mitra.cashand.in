import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReportRoutingModule } from "./report-routing.module";
import { AepsComponent } from "./aeps/aeps.component";
import { ReportComponent } from "./report.component";
import {
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbInputModule,
  NbSelectModule,
  NbSpinnerModule,
} from "@nebular/theme";
import { WalletComponent } from "./wallet/wallet.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BconboardingComponent } from './bconboarding/bconboarding.component';
@NgModule({
  declarations: [AepsComponent, ReportComponent, WalletComponent, BconboardingComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    NbCardModule,
    NbDatepickerModule,
    NbInputModule,
    NbSpinnerModule,
    NbButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NbSelectModule,
  ],
})
export class ReportModule {}
