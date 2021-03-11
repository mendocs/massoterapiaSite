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


/*
{path: "", component :Modulo1Component },
{path: "filho1", component :Modulo1Filho1Component ,
    canDeactivate: [Modulo1Filho1deactivateServiceService]
    ,canActivate : [Modulo1Filho1CanActivateService]
    ,canActivateChild: [Modulo1Filho1CanActivateChildService]
    ,children : [{path: ":variavalParametro", component :Modulo1Filho1DetalheComponent}]
  }
  */
