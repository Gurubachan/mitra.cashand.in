import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtmMappingComponent } from './atm-mapping/atm-mapping.component';
import { CommissionRevisionComponent } from './commission-revision/commission-revision.component';
import { GlobalServiceComponent } from './global-service/global-service.component';
import { QRMasterComponent } from './qrmaster/qrmaster.component';
import { SettingComponent } from './setting.component';
import {PayoutMasterComponent} from './payout-master/payout-master.component';

const routes: Routes = [{
    path: "",
    component: SettingComponent,
    children: [
       {
        path:'atm-mapping',
        component:AtmMappingComponent
      },
       {
        path:'commission',
        component:CommissionRevisionComponent
      },
      {
        path:'service',
        component:GlobalServiceComponent
      },
      {
        path:'qr-master',
        component: QRMasterComponent
      },
      {
        path: 'payout-master',
        component: PayoutMasterComponent
      }
    ],
    }
    ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
