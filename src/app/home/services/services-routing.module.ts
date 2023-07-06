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
import { AtmComponent } from "./atm/atm.component";
import { AtmMappingComponent } from "../setting/atm-mapping/atm-mapping.component";
import { AxisCasaComponent } from "./axis-casa/axis-casa.component";
import { LicComponent } from "./lic/lic.component";
import { FastagComponent } from "./fastag/fastag.component";
import { BbpsComponent } from "./bbps/bbps.component";
import { UnifiedaepsComponent } from "./unifiedaeps/unifiedaeps.component";
import { HappyLoansComponent } from "./loans/happy-loans/happy-loans.component";
import { SettlementLoadingComponent } from "./settlement-loading/settlement-loading.component";

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
        path: "settlement_loading",
        component: SettlementLoadingComponent,
      },
      {
        path: "pan",
        component: PanComponent,
      },
      {
        path:"matm",
        component:AtmComponent
      },
      {
        path:"atm-mapping",
        component:AtmMappingComponent
      },
      {
        path:"axis-casa",
        component:AxisCasaComponent
      },
      {
        path:"lic",
        component:LicComponent
      },
      {
        path:"fastag",
        component:FastagComponent
      },
      {
        path:"bbps",
        component:BbpsComponent
      },
      {
        path:"unified",
        component:UnifiedaepsComponent
      },
      {
        path:"loan",
        component:HappyLoansComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesRoutingModule {}
