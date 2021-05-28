import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home.component';
import { ServicesModule } from './services/services.module';
import { AuthGuard } from '../auth.guard';
import { AuthModule } from '../auth/auth.module';
import { ProfileComponent } from './profile/profile.component';
import {UsersComponent} from './users/users.component';
import { ReportModule } from './report/report.module';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'members',
        component: UsersComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'services',
        loadChildren: () => ServicesModule,
        canActivate: [AuthGuard],
      },
      {
        path: 'reports',
        loadChildren: () => ReportModule,
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: 'auth', loadChildren: () => AuthModule},
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
