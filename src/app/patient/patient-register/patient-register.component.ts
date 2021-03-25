import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseFormComponent } from 'src/app/shared-kernel/forms/core/base-form.component';

import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import * as _moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { PatientService } from '../patient-data/services/patient.service';
import { patient } from '../patient-data/models/patient.model';
import { ActivatedRoute, Router } from '@angular/router';
import { schedule } from '../patient-data/models/schedule.model';
import { ScheduleRegisterComponent } from '../schedule-register/schedule-register.component';
import { AuthService } from 'src/app/admin/services/auth.service';
import { patientSaved } from '../patient-data/models/patientSavedResult.model';
//import { _rollupMoment} from 'moment';

const moment =  _moment;



export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },

};

@Component({
  selector: 'app-patient-register',
  templateUrl: './patient-register.component.html',
  styleUrls: ['./patient-register.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class PatientRegisterComponent extends BaseFormComponent implements OnInit  {

  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;


  parameterID : string;
  cssCol = "col-12 col-md-6 col-lg-4 d-flex align-items-center full-width-field ";

  searchMode=true;
  startDate = new Date(1923, 0,1);
  accordionGroupOpen : boolean[] = [false,false,false,false];

  schedulesPopulated = false;
  messageError : string = "";



  motivation = ['Relaxamento', 'Terapêutico', 'Apoio ao esporte', 'Estética'];
  disease = ['Hipertensão Arterial', 'Hipotensão Arterial', 'Diabetes'];
  healthChanges = ['Cardíacas','Vasculares','Respiratórias','Digestórias','Hormonais','Dermatológicas','Neurológicas','Articulares','Músculo Esqueléticas','Urinárias','Genitais','Hematológicas','Psicoemocionais','Cabeça','Olhos','Nariz','Boca','Ouvidos'];
  treatments = ['Alopat','Homeo','Psiquiátrico','Psicológico','Fisioterapêutico'];


  patientObserver = {
		next: (currentPatient : patient) => this.populatePatient(currentPatient),
		error: err => console.log(err),
		complete: () => {},
	  };

  parameterIdObserver = {
    next: (params) => this.getPatient(params["id"] ),
    error: err => console.log(err),
    complete: () => {},
    };

  removeScheduleObserver = {
      next: (index) => this.RemoveSchedule(index ),
      error: err => console.log(err),
      complete: () => {},
      };

  savePatientObserver = {
    next: (result => this.patientSaved(result )),
    error: err => console.log(err),
    complete: () => {},
    };


 patientSelected : patient;
 savedData : boolean = false;
 enable_gotoTop : boolean = false;


  constructor(
    private patientService : PatientService,
    private route: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder,
    private authService : AuthService,

    ) { super(formBuilder); }


  isAuthenticated(): boolean
  {
    return this.authService.isAuthenticated();
  }


  submit():void{

    let valueSubmit = Object.assign({}, this.formulario.value);

    valueSubmit = this.convertFormArrayToValues ("motivation",valueSubmit);
    valueSubmit = this.convertFormArrayToValues ("disease",valueSubmit);
    valueSubmit = this.convertFormArrayToValues ("healthChanges",valueSubmit);
    valueSubmit = this.convertFormArrayToValues ("treatments",valueSubmit);

    valueSubmit = this.convertFormArrayToSchedules (valueSubmit);

    this.patientService.savePatient(valueSubmit).subscribe(this.savePatientObserver);

  }

  convertFormArrayToSchedules( valueSubmit: any) : any
  {

     let objeto = new Object()
     return Object.assign(valueSubmit, {
       "schedules": valueSubmit["schedules"]
       .map((v, i) => v ? this.formulario.get("schedules")["controls"][i].value : null)

     });
  }



  submitFail():void{}

  ngOnInit(): void {

    this.buildFormulario();
    this.getParameters();
    this.patientService.removedor$.subscribe(this.removeScheduleObserver);

    if (!this.isAuthenticated())
      this.accordionGroupOpen = [true,false,false,false];
  }


  buildFormulario()
  {
    this.formulario =
    new FormGroup (
      {
        phone : new FormControl(''),
        name:  new FormControl('',  ),
        dateFillData:  new FormControl() ,
        maritalStatus: new FormControl() ,
        sons: new FormControl() ,
        dateBorn:  new FormControl(new Date('1982-11-10T03:00:00.000Z')) ,
        weight: new FormControl() ,
        phoneContact: new FormControl(''),
        occupation: new FormControl(''),
        motivation: this.builddFormArray(this.motivation),
        mainComplaint: new FormControl(''),
        historyComplaint: new FormControl(''),
        secundaryComplaint: new FormControl(''),
        ingestionLiquid: new FormControl(''),
        liquidTypes: new FormControl(''),
        smoking: new FormControl(''),
        alcohol: new FormControl(''),
        psychoactive: new FormControl(''),
        addiction: new FormControl(''),
        physicalActivity: new FormControl(''),
        physicalActivityFrequency: new FormControl(''),
        qualitySleep: new FormControl(''),
        food: new FormControl(''),
        feces: new FormControl(''),
        lastFeces: new FormControl(''),
        leisureActivities: new FormControl(''),
        leisureRestWork: new FormControl(''),
        disease: this.builddFormArray(this.disease),
        healthChanges: this.builddFormArray(this.healthChanges),
        treatments : this.builddFormArray(this.treatments),
        othersTreatments: new FormControl(''),
        medicines: new FormControl(''),
        diu: new FormControl(''),
        dum: new FormControl(''),
        subcutaneous: new FormControl(''),
        subcutaneousOther: new FormControl(''),
        surgeries: new FormControl(''),
        familyIllnessess: new FormControl(''),


      }
      );


      this.formulario.get("name").setValidators([ Validators.required, Validators.minLength(3)]);
      this.formulario.get("name").updateValueAndValidity();
  }

  getParameters()
  {
    this.route.params.subscribe(this.parameterIdObserver);
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.startDate = new Date( this.formulario.get("dateBorn").value );
  }

  getPatient(id: string)
  {
    this.patientService.getPatientById(id).subscribe(this.patientObserver);
  }

  patientSaved(result: patientSaved)
  {
    this.savedData = result.result;
    this.messageError = result.messageError;
  }


  getSchedules() //: schedule[]
  {
    return this.patientSelected.schedules;

  }


  builddFormArraySchedules() {
    const values = this.patientSelected.schedules.map(v => new FormControl(v));
    return this.formBuilder.array(values);

  }


  populatePatient(currentPatient : patient): void{

    if (currentPatient.id === "404")
      this.router.navigate(["/paginanaoencontrada"]);


    this.patientSelected = currentPatient;
    this.formulario.patchValue(currentPatient);
    this.startDate = new Date(currentPatient.dateBorn);
    this.getArray(currentPatient,"motivation");
    this.getArray(currentPatient,"disease");
    this.getArray(currentPatient,"healthChanges");
    this.getArray(currentPatient,"treatments");

    this.formulario.addControl ("schedules" , this.builddFormArraySchedules());
    this.schedulesPopulated = true;
  }


  nextStepOnClick(index : number)
  {

    this.onSubmit();
    this.accordionGroupOpen[index] = true; //!this.accordionGroupOpen[index] ;
    this.accordionGroupOpen[index-1] = false; // !this.accordionGroupOpen[index-1];
  }

  addSchedule() : void
  {

    let newschedule : schedule = {startdDate : new Date(), comments: "", confirmed : false, executed: false  };
    this.patientSelected.schedules.push(newschedule);
    let items = this.formulario.get("schedules") as FormArray;
    items.push(new FormControl(this.patientSelected.schedules[this.patientSelected.schedules.length-1]));

  }

  RemoveSchedule(index : number) : void
  {

    this.patientSelected.schedules.splice(index,1) ;
    (<FormArray>this.formulario.get('schedules')).removeAt(index);

  }



  onClosed(dismissedAlert: any): void {
    this.savedData = false;
    this.messageError="";
  }


  gotoTop(event: boolean, elementID :string) : void {
    if (event && this.enable_gotoTop)
    {
      let el = document.getElementById(elementID);
      setTimeout(()=>{
        el.scrollIntoView();
        window.scrollTo( 0,window.scrollY - 30);
      }, 350);

    }
    this.enable_gotoTop  = true;
  }


}
