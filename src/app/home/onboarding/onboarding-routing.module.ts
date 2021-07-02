import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { IcicinewComponent } from "./icicinew/icicinew.component";
import { OnboardingComponent } from "./onboarding.component";

const routes: Routes = [
  {
    path: "",
    component: OnboardingComponent,
    children: [{ path: "aepsnew", component: IcicinewComponent }],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnboardingRoutingModule {}
