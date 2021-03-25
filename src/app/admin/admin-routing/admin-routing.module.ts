import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginComponent } from '../login/login.component';

import { AuthGuard } from '../guards/auth-guard';



const routes: Routes = [
  {path: "login", component :LoginComponent },
  {path: "", component : DashboardComponent , canActivate : [AuthGuard] },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

