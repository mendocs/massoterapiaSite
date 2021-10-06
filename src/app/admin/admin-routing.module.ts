import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './guards/auth-guard';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { BlogRegisterComponent } from './blog/blog-register/blog-register.component';



const routes: Routes = [
  {path: "login", component :LoginComponent },
  {path: "", component : DashboardComponent , canActivate : [AuthGuard] },
  {path: "blog", component : BlogListComponent , canActivate : [AuthGuard] },
  {path: "blog/:key", component : BlogRegisterComponent , canActivate : [AuthGuard] },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

