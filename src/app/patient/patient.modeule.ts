import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedKernelModule } from "../shared-kernel/shared-kernel.module";
import {PatientRoutingModule} from "./patient-routing.module";

import { PatientService} from "../patient/patient-data/services/patient.service"

import { PatientRegisterComponent } from "./patient-register/patient-register.component"
import { ScheduleRegisterComponent } from "./schedule-register/schedule-register.component"
import { CommonComponentsModule } from '../common-components/common-components.module';
import { AdminModule } from '../admin/admin.module';



@NgModule({
  declarations: [
    PatientRegisterComponent,
    /*ScheduleRegisterComponent*/
  ],
  imports: [
    AdminModule,
    CommonModule,
    CommonComponentsModule,
    PatientRoutingModule,
    SharedKernelModule
  ],
  providers: [PatientService, /*ScheduleRegisterComponent*/]
})
export class PatientModule { }
