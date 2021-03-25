import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientRegisterComponent } from "./patient-register/patient-register.component"

const routes: Routes = [
  {path: ":id", component :PatientRegisterComponent },
  {path: "", redirectTo : "/" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }

