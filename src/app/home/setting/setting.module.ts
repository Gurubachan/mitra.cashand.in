import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbAlertModule,
  NbAutocompleteModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbProgressBarModule,
  NbSelectModule,
  NbSpinnerModule,
  NbUserModule,
  NbListModule,
  NbToggleModule,
} from "@nebular/theme";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SettingRoutingModule } from './setting-routing.module';
import { AtmMappingComponent } from './atm-mapping/atm-mapping.component';
import { CommissionRevisionComponent } from './commission-revision/commission-revision.component';
import { GlobalServiceComponent } from './global-service/global-service.component';


@NgModule({
  declarations: [
    AtmMappingComponent,
    CommissionRevisionComponent,
    GlobalServiceComponent,
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
     NbCardModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbSelectModule,
    NbButtonModule,
    NbAlertModule,
    NbCheckboxModule,
    NbSpinnerModule,
    NbIconModule,
    NbAutocompleteModule,
    NbProgressBarModule,
    NbUserModule,
    NbListModule,
    NbToggleModule,
  ]
})
export class SettingModule { }
