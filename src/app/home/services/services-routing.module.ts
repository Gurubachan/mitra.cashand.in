import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AepsComponent } from "./aeps/aeps.component";
import { DmtComponent } from "./dmt/dmt.component";
import { RechargeComponent } from "./recharge/recharge.component";
import { ServicesComponent } from "./services.component";
import { ServiceListComponent } from "./service-list/service-list.component";
import { PayoutComponent } from "./payout/payout.component";
import { AepsnewComponent } from "./aepsnew/aepsnew.component";
import { PanComponent } from "./pan/pan.component";

const routes: Routes = [
  {
    path: "",
    component: ServicesComponent,
    children: [
      {
        path: "aeps",
        component: AepsComponent,
      },
      {
        path: "aepsNew",
        component: AepsnewComponent,
      },
      {
        path: "recharge",
        component: RechargeComponent,
      },
      {
        path: "dmt",
        component: DmtComponent,
      },
      {
        path: "myservice",
        component: ServiceListComponent,
      },
      {
        path: "payout",
        component: PayoutComponent,
      },
      {
        path: "pan",
        component: PanComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesRoutingModule {}
