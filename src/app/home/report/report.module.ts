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
  NbCheckboxModule
} from "@nebular/theme";
import { WalletComponent } from "./wallet/wallet.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BconboardingComponent } from "./bconboarding/bconboarding.component";
import { CashoutComponent } from "./cashout/cashout.component";
import { RechargeComponent } from "./recharge/recharge.component";
import { PanComponent } from "./pan/pan.component";
import { UpiComponent } from './upi/upi.component';
import { MoneytransferComponent } from './moneytransfer/moneytransfer.component';
import { UserwalletComponent } from './userwallet/userwallet.component';
import { MatmComponent } from './matm/matm.component';
import { TeamComponent } from './team/team.component';
import { LicComponent } from './lic/lic.component';
import { FastagComponent } from './fastag/fastag.component';
import { RetailersComponent } from './retailers/retailers.component';
import { BusinessSummaryComponent } from './business-summary/business-summary.component';
import { InactivelistComponent } from './inactivelist/inactivelist.component';
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
    UserwalletComponent,
    MatmComponent,
    TeamComponent,
    LicComponent,
    FastagComponent,
    RetailersComponent,
    BusinessSummaryComponent,
    InactivelistComponent,
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
    NbCheckboxModule
  
  ],
})
export class ReportModule {}
