import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AepsiciciComponent } from "./aepsicici/aepsicici.component";
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbOptionModule,
  NbProgressBarModule,
  NbSelectModule,
  NbSpinnerModule,
} from "@nebular/theme";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IcicinewComponent } from "./icicinew/icicinew.component";
import { OnboardingComponent } from "./onboarding.component";
import { OnboardingRoutingModule } from "./onboarding-routing.module";

@NgModule({
  declarations: [AepsiciciComponent, IcicinewComponent, OnboardingComponent],
  exports: [AepsiciciComponent],
  imports: [
    CommonModule,
    NbOptionModule,
    NbSelectModule,
    FormsModule,
    NbInputModule,
    NbAlertModule,
    NbButtonModule,
    OnboardingRoutingModule,
    NbCardModule,
    ReactiveFormsModule,
    NbSpinnerModule,
    NbProgressBarModule,
  ],
})
export class OnboardingModule {}
