import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';

export const routes: Routes = [
  { path: 'auth', loadChildren: () => AuthModule },
  { path: '', loadChildren: () => HomeModule },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
