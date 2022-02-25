import { Injectable } from '@angular/core';
import { patientForm } from 'src/app/patient/patient-data/models/patientViewModelForm.model';
import {dashboardFields } from "../models/dashboard-fields"

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  dashboardForm : patientForm

  constructor() {}


  saveDashboardForm (dashboardCurrentForm : patientForm ) : void {
    this.dashboardForm = dashboardCurrentForm;
  }


  getDashboardForm () : patientForm {
    return this.dashboardForm;
  }

}
