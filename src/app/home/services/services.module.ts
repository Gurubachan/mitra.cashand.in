import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ServicesRoutingModule } from "./services-routing.module";
import { ServicesComponent } from "./services.component";
import { AepsComponent } from "./aeps/aeps.component";
import { RechargeComponent } from "./recharge/recharge.component";
import { DmtComponent } from "./dmt/dmt.component";
import {
  NbAlertModule,
  NbAutocompleteModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbProgressBarModule,
  NbSelectModule,
  NbSpinnerModule,
  NbUserModule,
  NbListModule,
} from "@nebular/theme";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PayoutComponent } from "./payout/payout.component";
import { AepsnewComponent } from "./aepsnew/aepsnew.component";
import { PanComponent } from "./pan/pan.component";
import { AtmComponent } from "./atm/atm.component";

@NgModule({
  declarations: [
    ServicesComponent,
    AepsComponent,
    RechargeComponent,
    DmtComponent,
    PayoutComponent,
    AepsnewComponent,
    PanComponent,
    AtmComponent,
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    NbCardModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbSelectModule,
    NbButtonModule,
    NbAlertModule,
    NbCheckboxModule,
    NbSpinnerModule,
    NbIconModule,
    NbAutocompleteModule,
    NbProgressBarModule,
    NbUserModule,
    NbListModule,
  ],
})
export class ServicesModule {}
