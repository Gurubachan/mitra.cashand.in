import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbMenuModule,
  NbTabsetModule,
  NbToggleModule,
  NbPopoverModule,
  NbTooltipModule,
  NbSpinnerModule,
} from "@nebular/theme";
import { ThemeModule } from "../@theme/theme.module";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProfileComponent } from "./profile/profile.component";
import { ComponentModule } from "./component/component.module";
import { AdminDashboardComponent } from "./backoffice/admin-dashboard/admin-dashboard.component";
import { AdminProfileComponent } from "./backoffice/admin-profile/admin-profile.component";
import { UsersComponent } from "./users/users.component";
import { FormsModule } from "@angular/forms";
import { ViewProfileComponent } from "./users/view-profile/view-profile.component";
import { RetailerDashboardComponent } from "./backoffice/retailer-dashboard/retailer-dashboard.component";

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    AdminDashboardComponent,
    AdminProfileComponent,
    UsersComponent,
    ViewProfileComponent,
    RetailerDashboardComponent,
  ],
  imports: [
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbDatepickerModule,
    NbIconModule,
    NbInputModule,
    NbRadioModule,
    NbSelectModule,
    NbUserModule,
    NbMenuModule,
    ThemeModule,
    CommonModule,
    HomeRoutingModule,
    NbTabsetModule,
    ComponentModule,
    FormsModule,
    NbToggleModule,
    NbPopoverModule,
    NbTooltipModule,
    NbSpinnerModule,
  ],
})
export class HomeModule {}
