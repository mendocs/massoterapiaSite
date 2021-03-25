import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedKernelModule } from "../shared-kernel/shared-kernel.module";
import {PatientRoutingModule} from "./patient-routing.module";

import { PatientService} from "../patient/patient-data/services/patient.service"

import { PatientRegisterComponent } from "./patient-register/patient-register.component"
import { PatientRegisterLogoTopComponent } from "./patient-register/patient-register-logo-top/patient-register-logo-top.component"
import { ScheduleRegisterComponent } from "./schedule-register/schedule-register.component"



@NgModule({
  declarations: [
    PatientRegisterComponent,
    PatientRegisterLogoTopComponent,
    ScheduleRegisterComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    SharedKernelModule
  ],
  providers: [PatientService, ScheduleRegisterComponent]
})
export class PatientModule { }
