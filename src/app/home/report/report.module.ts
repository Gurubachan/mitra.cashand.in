import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReportRoutingModule } from "./report-routing.module";
import { AepsComponent } from "./aeps/aeps.component";
import { ReportComponent } from "./report.component";
import {
  NbCardModule,
  NbDatepickerModule,
  NbInputModule,
  NbSpinnerModule,
} from "@nebular/theme";
import { WalletComponent } from "./wallet/wallet.component";
import { FormsModule } from "@angular/forms";
@NgModule({
  declarations: [AepsComponent, ReportComponent, WalletComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    NbCardModule,
    NbDatepickerModule,
    NbInputModule,
    NbSpinnerModule,
    FormsModule,
  ],
})
export class ReportModule {}
