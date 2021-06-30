import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { patientList } from 'src/app/patient/patient-data/models/patientviewModelList.model';
import { patientForm } from 'src/app/patient/patient-data/models/patientViewModelForm.model';
import { BaseFormComponent } from 'src/app/shared-kernel/forms/core/base-form.component';
import { PatientService} from "../../../patient/patient-data/services/patient.service"
import { DashboardService } from '../../services/dashboard.service';
import { ThrowStmt } from '@angular/compiler';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-patient-header',
  templateUrl: './patient-header.component.html',
  styleUrls: ['./patient-header.component.scss']
})
export class PatientHeaderComponent extends BaseFormComponent implements OnInit  {

  ismeridian: boolean = false;
  scheduledate: Date = new Date();
  scheduletime: Date = new Date();
  newPatient : patientList[];
  showPatient : boolean;
  searchMode : boolean = false;
  isLoading : boolean = false;
  showMessage  : boolean = false;
  messageError : string = "";


  patientObserver = {
		next: (newPatient : patientList[]) => this.getNewpatient(newPatient),
		error: err => this.getError(err) ,
		complete: () => {},
	  };

  constructor(private patientService : PatientService, private dashboardService: DashboardService) { super();}

submit(): void{

  this.isLoading = true;
  this.showPatient = false;
  this.showMessage = false;
  var patientCurrentForm = Object.assign(new patientForm, this.formulario.value);

  if(this.formulario.get("formMode").value)
    this.patientService.searchPatient(patientCurrentForm).subscribe(this.patientObserver);
  else
    this.patientService.createPatient(patientCurrentForm).subscribe(this.patientObserver);

  this.dashboardService.saveDashboardForm(patientCurrentForm) ;

}

submitFail():void{}

getError(err : HttpErrorResponse): void{
  this.isLoading = false;
  this.showMessage = true;

  if (err.statusText.includes("Unknown Error") )
    this.messageError = "Sem conexão com o servidor";
  else
    this.messageError = err.error;

}

getNewpatient(newPatient : patientList[]): void{

  this.newPatient = newPatient;
  this.showPatient = true;
  this.isLoading = false;

  if (this.patientService.lasPatientCreateStatus() == 200)
  {
    this.showMessage = true;
    this.messageError = "Paciente já existente";
  }
  else
    this.showMessage = false;

}





  ngOnInit(): void {

    this.formulario =
    new FormGroup (
      {
        phone : new FormControl(''),
        name:  new FormControl(''),
        scheduledateRange:  new FormControl() ,
        scheduledate:  new FormControl(new Date(), ),
        scheduletime:  new FormControl(new Date(), ),
        formMode :  new FormControl(false) ,
      }
      );

      this.chooseFormMode();

      this.getSavedForm();
  }

getSavedForm(): void
{
  if (this.dashboardService.getDashboardForm() !== undefined)
  {
    this.formulario.patchValue(this.dashboardService.getDashboardForm());
    this.chooseFormMode();

    this.getNewpatient(this.patientService.lastPatientList())
  }
}



  chooseFormMode(): void
  {

    this.searchMode = this.formulario.get("formMode").value;
    if (this.formulario.get("formMode").value )
    {

      this.formulario.get("phone").clearValidators();
      this.formulario.get("name").clearValidators();

    }
    else
    {

      this.formulario.get("phone").setValidators([Validators.required, Validators.minLength(11), Validators.maxLength(11)]);
      this.formulario.get("name").setValidators([ Validators.required, Validators.minLength(3)]);

    }

    this.formulario.get("phone").updateValueAndValidity();
    this.formulario.get("name").updateValueAndValidity();



  }



  isScheduleSincronized(): boolean
  {
    if (this.formulario.get("scheduletime").value.getDate() != this.formulario.get("scheduledate").value.getDate() )
      return false;

    if (this.formulario.get("scheduletime").value.getMonth() != this.formulario.get("scheduledate").value.getMonth() )
      return false;

    if (this.formulario.get("scheduletime").value.getFullYear() != this.formulario.get("scheduledate").value.getFullYear() )
      return false;

   return true;
  }


  onCcheduletimeChanged() : void
  {
    if (this.formulario.get("scheduledate").value != null)
    {
      if (this.formulario.get("scheduledate").value === "" )
      {
        this.formulario.get("scheduledate").setValue ( this.formulario.get("scheduletime").value);
      }

      this.sincronizeSchedule();
    }
  }

  clearDateSchedule(){
    this.formulario.get("scheduledate").setValue(null);
    this.formulario.get("scheduletime").setValue(null);
  }


sincronizeSchedule() : void
{
  this.formulario.get("scheduletime").value.setDate(this.formulario.get("scheduledate").value.getDate());
  this.formulario.get("scheduletime").value.setMonth(this.formulario.get("scheduledate").value.getMonth());
}


  onValueChangeScheduledate(value: Date): void {

      //if (this.formulario.get("scheduletime").value != null &&  this.formulario.get("scheduledate").value != null)
      {
          if (this.formulario.get("scheduletime").value === "" )
          {
            this.formulario.get("scheduletime").setValue ( this.formulario.get("scheduledate").value);
          }
          this.sincronizeSchedule();
      }
  }

  getScheduleDateRange() : Date[]
  {
    try{
      let dateRange : Date[] =[] ;
      dateRange.push(new Date(this.formulario.get("scheduledateRange").value[0]))
      dateRange.push(new Date(this.formulario.get("scheduledateRange").value[1]))

      dateRange[0].setHours(0);
      dateRange[0].setMinutes(0);

      dateRange[1].setHours(23);
      dateRange[1].setMinutes(59);
      return dateRange;
    }
    catch{
      return null;
    }
  }

}
