import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AepsComponent } from "./aeps/aeps.component";
import { BconboardingComponent } from "./bconboarding/bconboarding.component";
import { ReportComponent } from "./report.component";
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {}
