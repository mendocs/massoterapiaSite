import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';

import {AdminRoutingModule} from "./admin-routing/admin-routing.module";
import { DashboardComponent } from './dashboard/dashboard.component';

import {AuthService} from "./services/auth.service";
import { AuthGuard } from './guards/auth-guard';
import { SharedKernelModule } from '../shared-kernel/shared-kernel.module';



@NgModule({
  declarations: [
    DashboardComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedKernelModule
  ],
  providers: [AuthService, AuthGuard]
})
export class AdminModule { }
