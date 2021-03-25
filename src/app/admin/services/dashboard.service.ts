import { Injectable } from '@angular/core';
import {dashboardFields } from "../models/dashboard-fields"

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  dashboardForm : dashboardFields

  constructor() {}


  saveDashboardForm (dashboardCurrentForm : dashboardFields ) : void
  {
    this.dashboardForm = dashboardCurrentForm;
  }


  getDashboardForm () : dashboardFields
  {
    return this.dashboardForm;
  }

}
