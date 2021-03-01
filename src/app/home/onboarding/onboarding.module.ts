import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AepsiciciComponent } from './aepsicici/aepsicici.component';
import {NbAlertModule, NbButtonModule, NbInputModule, NbOptionModule, NbSelectModule} from '@nebular/theme';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [AepsiciciComponent],
  exports: [
    AepsiciciComponent
  ],
  imports: [
    CommonModule,
    NbOptionModule,
    NbSelectModule,
    FormsModule,
    NbInputModule,
    NbAlertModule,
    NbButtonModule,
  ]
})
export class OnboardingModule { }
