import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AepsComponent } from "./aeps/aeps.component";
import { BconboardingComponent } from "./bconboarding/bconboarding.component";
import { BusinessSummaryComponent } from "./business-summary/business-summary.component";
import { CashoutComponent } from "./cashout/cashout.component";
import { CommissionSheetComponent } from "./commission-sheet/commission-sheet.component";
import { FastagComponent } from "./fastag/fastag.component";
import { InactivelistComponent } from "./inactivelist/inactivelist.component";
import { LicComponent } from "./lic/lic.component";
import { MatmComponent } from "./matm/matm.component";
import { MoneytransferComponent } from "./moneytransfer/moneytransfer.component";
import { PanComponent } from "./pan/pan.component";
import { RechargeComponent } from "./recharge/recharge.component";
import { ReportComponent } from "./report.component";
import { RetailersComponent } from "./retailers/retailers.component";
import { TeamBusinessSummaryComponent } from "./team-business-summary/team-business-summary.component";
import { TeamComponent } from "./team/team.component";
import { UnifiedReportComponent } from "./unified-report/unified-report.component";
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
        path:"unified-aeps",
        component:UnifiedReportComponent
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
      {
        path:"matm",
        component: MatmComponent,
      },
      {
        path:"team",
        component: TeamComponent,
      },
      {
        path:"lic",
        component: LicComponent,
      },
      {
        path:"fastag",
        component: FastagComponent,
      },
      {
        path:"retailers",
        component: RetailersComponent,
      },
      {
        path:"business-summary",
        component: BusinessSummaryComponent,
      },
      {
        path:"team-business-summary",
        component: TeamBusinessSummaryComponent,
      },
      {
        path:"inactive",
        component: InactivelistComponent,
      },
      {
        path:"commission-sheet",
        component: CommissionSheetComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {}
