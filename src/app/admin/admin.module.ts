import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';

import {AdminRoutingModule} from "./admin-routing.module";
import { DashboardComponent } from './dashboard/dashboard.component';

//import {AuthService} from "./services/auth.service";
import { PatientService} from "../patient/patient-data/services/patient.service"
import { AuthGuard } from './guards/auth-guard';
import { SharedKernelModule } from '../shared-kernel/shared-kernel.module';
import { PatientHeaderComponent } from './patient-components/patient-header/patient-header.component';
import { PatientRegisterLineComponent } from './patient-components/patient-register-line/patient-register-line.component';
import {DashboardService } from "./services/dashboard.service";
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { BlogRegisterComponent } from './blog/blog-register/blog-register.component';
import { AdminBlogService } from './blog/services/admin-blog.service';
import { ScheduleRegisterComponent } from '../patient/schedule-register/schedule-register.component';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
defineLocale('pt-br', ptBrLocale);


@NgModule({
  declarations: [
    DashboardComponent,
    LoginComponent,
    PatientHeaderComponent,
    PatientRegisterLineComponent,
    BlogListComponent,
    BlogRegisterComponent,
    ScheduleRegisterComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedKernelModule
  ],
  exports:[ScheduleRegisterComponent],
  providers: [ AuthGuard, PatientService, DashboardService, AdminBlogService, ScheduleRegisterComponent]
})
export class AdminModule { }
