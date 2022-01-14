import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReportRoutingModule } from "./report-routing.module";
import { AepsComponent } from "./aeps/aeps.component";
import { ReportComponent } from "./report.component";
import {
  NbAutocompleteModule,
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbSpinnerModule,
} from "@nebular/theme";
import { WalletComponent } from "./wallet/wallet.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BconboardingComponent } from "./bconboarding/bconboarding.component";
import { CashoutComponent } from "./cashout/cashout.component";
import { RechargeComponent } from "./recharge/recharge.component";
import { PanComponent } from "./pan/pan.component";
import { UpiComponent } from './upi/upi.component';
import { MoneytransferComponent } from './moneytransfer/moneytransfer.component';
@NgModule({
  declarations: [
    AepsComponent,
    ReportComponent,
    WalletComponent,
    BconboardingComponent,
    CashoutComponent,
    RechargeComponent,
    PanComponent,
    UpiComponent,
    MoneytransferComponent,
  ],
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
    NbAutocompleteModule,
    NbIconModule,
  ],
})
export class ReportModule {}
