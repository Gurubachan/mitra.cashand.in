import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AepsComponent } from './aeps/aeps.component';
import { DmtComponent } from './dmt/dmt.component';
import { RechargeComponent } from './recharge/recharge.component';
import { ServicesComponent } from './services.component';
import {ServiceListComponent} from './service-list/service-list.component';

const routes: Routes = [
  {
    path: '',
    component:ServicesComponent,
    children: [{
      path: 'aeps',
      component:AepsComponent
    },
    {
      path: 'recharge',
      component:RechargeComponent
    },
    {
      path: 'dmt',
      component:DmtComponent
    },
      {
        path: 'myservice',
        component: ServiceListComponent
      }
      ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
