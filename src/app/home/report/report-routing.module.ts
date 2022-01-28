import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AepsComponent } from "./aeps/aeps.component";
import { BconboardingComponent } from "./bconboarding/bconboarding.component";
import { CashoutComponent } from "./cashout/cashout.component";
import { MoneytransferComponent } from "./moneytransfer/moneytransfer.component";
import { PanComponent } from "./pan/pan.component";
import { RechargeComponent } from "./recharge/recharge.component";
import { ReportComponent } from "./report.component";
import { UpiComponent } from "./upi/upi.component";
import { UserwalletComponent } from "./userwallet/userwallet.component";
import { WalletComponent } from "./wallet/wallet.component";

const routes: Routes = [
  {
    path: "",
    component: ReportComponent,
    children: [
      {
        path: "aeps",
        component: AepsComponent,
      },
      {
        path: "statement",
        component: WalletComponent,
      },
      {
        path: "bconboarding",
        component: BconboardingComponent,
      },
      {
        path: "cashout",
        component: CashoutComponent,
      },
      {
        path: "recharge",
        component: RechargeComponent,
      },
      {
        path: "pan",
        component: PanComponent,
      },
      {
        path: "upi",
        component: UpiComponent,
      },
      {
        path: "money-transfer",
        component: MoneytransferComponent,
      },
      {
        path:"user-wallet",
        component: UserwalletComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {}
