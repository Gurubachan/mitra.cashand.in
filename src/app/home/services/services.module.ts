import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ServicesRoutingModule } from "./services-routing.module";
import { ServicesComponent } from "./services.component";
import { AepsComponent } from "./aeps/aeps.component";
import { RechargeComponent } from "./recharge/recharge.component";
import { DmtComponent } from "./dmt/dmt.component";
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbInputModule,
  NbSelectModule,
} from "@nebular/theme";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    ServicesComponent,
    AepsComponent,
    RechargeComponent,
    DmtComponent,
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    NbCardModule,
    FormsModule,
    NbInputModule,
    NbSelectModule,
    NbButtonModule,
    NbAlertModule,
    NbCheckboxModule,
  ],
})
export class ServicesModule {}
