import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesRoutingModule } from './services-routing.module';
import { ServicesComponent } from './services.component';
import { AepsComponent } from './aeps/aeps.component';
import { RechargeComponent } from './recharge/recharge.component';
import { DmtComponent } from './dmt/dmt.component';
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbSpinnerModule,
} from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { PayoutComponent } from './payout/payout.component';
import { AepsnewComponent } from './aepsnew/aepsnew.component';

@NgModule({
  declarations: [
    ServicesComponent,
    AepsComponent,
    RechargeComponent,
    DmtComponent,
    PayoutComponent,
    AepsnewComponent,
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
    NbSpinnerModule,
    NbIconModule,
  ],
})
export class ServicesModule {}
