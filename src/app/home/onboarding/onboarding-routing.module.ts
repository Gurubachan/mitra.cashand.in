import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { IcicinewComponent } from "./icicinew/icicinew.component";
import { HappyloansComponent } from "./loans/happyloans/happyloans.component";
import { OnboardingComponent } from "./onboarding.component";
import { UnifiedAepsComponent } from "./unified-aeps/unified-aeps.component";

const routes: Routes = [
  {
    path: "",
    component: OnboardingComponent,
    children: [
      { 
        path: "aepsnew", 
        component: IcicinewComponent 
      },
      {
        path:"aeps",
        component:UnifiedAepsComponent
      },
      {
        path:"self-loan-onboard",
        component:HappyloansComponent
      }
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnboardingRoutingModule {}
