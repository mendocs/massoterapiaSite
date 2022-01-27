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
import { HttpErrorResponse } from '@angular/common/http';
import { UtilsService } from "../../shared-kernel/tools/utils.service";
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
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
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
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
  isLoadingSaveData : boolean = false;
  //SavedSuccess : boolean = false;
  //isLoading: boolean = true;

  //recordSuccess: boolean = false;

  Motivation = ['Relaxamento', 'Terapêutico', 'Apoio ao esporte', 'Estética'];
  Disease = ['Hipertensão Arterial', 'Hipotensão Arterial', 'Diabetes'];
  HealthChanges = ['Cardíacas','Vasculares','Respiratórias','Digestórias','Hormonais','Dermatológicas','Neurológicas','Articulares','Músculo Esqueléticas','Urinárias','Genitais','Hematológicas','Psicoemocionais','Cabeça','Olhos','Nariz','Boca','Ouvidos'];
  Treatments = ['Alopático','Homeopático','Psiquiátrico','Psicológico','Fisioterapêutico'];


  patientObserver = {
		next: (currentPatient : patient) => this.populatePatient(currentPatient),
		error: err => this.getError(err),
		complete: () => {},
	  };

  parameterIdObserver = {
    next: (params) => this.getPatient(params["key"] ),
    error: err => this.getError(err),
    complete: () => {},
    };

  removeScheduleObserver = {
      next: (index) => this.RemoveSchedule(index ),
      error: err => this.getError(err),
      complete: () => {},
      };

  savePatientObserver = {
    next: (result => this.patientSaved(result )),
    error: err => this.getError(err),
    complete: () => {},
    };


 patientSelected : patient;
 savedData : number = 0;
 enable_gotoTop : boolean = false;
 updatePatientSubscription$ : Subscription;
 removedorSubscription$ : Subscription;
 routeParamsSubscription$ : Subscription;
 getPatientByIdSubscription$ : Subscription;

  constructor(
    private patientService : PatientService,
    private route: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder,
    private authService : AuthService,
    private utilsService : UtilsService,
    private _titleService: Title

    ) {
      super(formBuilder);
      this.isLoading = true;
    }


  getError(err : HttpErrorResponse): void{
    super.getError(err);
    const msgErrorReturn : string =  JSON.stringify(err.error);

    if (msgErrorReturn.includes("One or more validation errors occurred"))
      this.router.navigate(["/paginanaoencontrada"]);

    this.isLoadingSaveData = false;

  }


  isAuthenticated(): boolean
  {
    return this.authService.isAuthenticated();
  }


  submit():void{
    this.savedData = 0;
    this.isLoadingSaveData = true;

    let valueSubmit = Object.assign({}, this.formulario.value);

    valueSubmit = this.convertFormArrayToValues ("Motivation",valueSubmit);
    valueSubmit = this.convertFormArrayToValues ("Disease",valueSubmit);
    valueSubmit = this.convertFormArrayToValues ("HealthChanges",valueSubmit);
    valueSubmit = this.convertFormArrayToValues ("Treatments",valueSubmit);

    valueSubmit = this.convertFormArrayToSchedules (valueSubmit);

    this.updatePatientSubscription$ =  this.patientService.updatePatient(valueSubmit).subscribe(this.savePatientObserver);

  }

  convertFormArrayToSchedules( valueSubmit: any) : any
  {
     let objeto = new Object()
     return Object.assign(valueSubmit, {
       "Schedules": valueSubmit["Schedules"]
       .map((v, i) => v ? this.formulario.get("Schedules")["controls"][i].value : null)
     });
  }



  submitFail():void{}

  ngOnInit(): void {
    this._titleService.setTitle("NEL Zen Massoterapia - Área Cliente");
    this.buildFormulario();
    this.getParameters();
    this.removedorSubscription$ =  this.patientService.removedor$.subscribe(this.removeScheduleObserver);

    if (!this.isAuthenticated())
      this.accordionGroupOpen = [true,false,false,false];
  }

  ngOnDestroy() : void{
    this.updatePatientSubscription$?.unsubscribe();
    this.removedorSubscription$?.unsubscribe();
    this.routeParamsSubscription$?.unsubscribe();
    this.getPatientByIdSubscription$?.unsubscribe();
  }


  buildFormulario() : void
  {
    this.formulario =
    new FormGroup (
      {
        Key : new FormControl(''),
        Updated : new FormControl(''),
        Created : new FormControl(''),
        Phone : new FormControl(''),
        Name:  new FormControl('',  ),
        DateFillData:  new FormControl() ,
        MaritalStatus: new FormControl() ,
        Sons: new FormControl() ,
        DateBorn:  new FormControl() ,
        Weight: new FormControl() ,
        PhoneContact: new FormControl(''),
        Occupation: new FormControl(''),
        Motivation: this.builddFormArray(this.Motivation),
        MainComplaint: new FormControl(''),
        HistoryComplaint: new FormControl(''),
        SecundaryComplaint: new FormControl(''),
        IngestionLiquid: new FormControl(''),
        LiquidTypes: new FormControl(''),
        Smoking: new FormControl(''),
        Alcohol: new FormControl(''),
        //Psychoactive: new FormControl(''),
        //Addiction: new FormControl(''),
        PhysicalActivity: new FormControl(''),
        PhysicalActivityFrequency: new FormControl(''),
        QualitySleep: new FormControl(''),
        Food: new FormControl(''),
        Feces: new FormControl(''),
        LastFeces: new FormControl(''),
        LeisureActivities: new FormControl(''),
        //LeisureRestWork: new FormControl(''),
        Disease: this.builddFormArray(this.Disease),
        HealthChanges: this.builddFormArray(this.HealthChanges),
        Treatments : this.builddFormArray(this.Treatments),
        OthersTreatments: new FormControl(''),
        Medicines: new FormControl(''),
        Diu: new FormControl(''),
        Prosthesis: new FormControl(''),
        Dum: new FormControl(''),
        Subcutaneous: new FormControl(''),
        Comments: new FormControl(''),
        Surgeries: new FormControl(''),
        //FamilyIllnessess: new FormControl(''),
        scheduleData: new FormControl(new schedule())
      }
      );

      this.formulario.get("Name").setValidators([ Validators.required, Validators.minLength(3)]);
      this.formulario.get("Name").updateValueAndValidity();
  }

  getParameters() : void
  {
    this.routeParamsSubscription$ =  this.route.params.subscribe(this.parameterIdObserver);
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) : void {
    this.startDate = new Date( this.formulario.get("DateBorn").value );
  }

  getPatient(id: string) : void
  {
    this.getPatientByIdSubscription$ = this.patientService.getPatientById(id).subscribe(this.patientObserver);
  }

  patientSaved(result: number) : void
  {
    this.recordSuccess = false;
    this.isLoadingSaveData = false;
    this.savedData = result;
    this.isError = false;
    if (this.savedData == 0)
    {
        this.isError = true;
        this.messageError = "Registro não foi gravado, recarregue a pagina e tente novamente";
    }
    else
      this.recordSuccess = true;
  }


  getSchedules() : schedule[]
  {
    return this.patientSelected.Schedules;
  }

  functionSort (a : schedule, b : schedule) : number {
    return new Date(a.StartdDate).getTime() - new Date(b.StartdDate).getTime()}


  builddFormArraySchedules() : FormArray {
    const values = this.patientSelected.Schedules
    .sort((a,b)=> new Date(a.StartdDate).getTime() - new Date(b.StartdDate).getTime())
    .map(v => new FormControl(v));
    return this.formBuilder.array(values);
  }


  setNullDateTime(currentPatient : patient) : void
  {

    if (currentPatient.DateBorn.toString().includes("0001"))
      this.formulario.get("DateBorn").setValue('');

    if (currentPatient.DateFillData.toString().includes("0001"))
      this.formulario.get("DateFillData").setValue("");

  }

  populatePatient(currentPatient : patient): void{

    this.patientSelected = currentPatient;
    this.formulario.patchValue(currentPatient);

    this.startDate = new Date(currentPatient.DateBorn);

    this.getArray(currentPatient,"Motivation");
    this.getArray(currentPatient,"Disease");
    this.getArray(currentPatient,"HealthChanges");
    this.getArray(currentPatient,"Treatments");

    this.formulario.addControl ("Schedules" , this.builddFormArraySchedules());
    this.schedulesPopulated = true;

    this.setNullDateTime(currentPatient);

    this.isLoading = false;

  }


  nextStepOnClick(index : number) : void
  {
    this.onSubmit();
    this.accordionGroupOpen[index] = true; //!this.accordionGroupOpen[index] ;
    this.accordionGroupOpen[index-1] = false; // !this.accordionGroupOpen[index-1];
  }

  addSchedule() : void
  {
    let newschedule : schedule = new schedule(); //{StartdDate : new Date(), Comments: "", Confirmed : false, Executed: false , Canceled: false };
    this.patientSelected.Schedules.push(newschedule);
    let items = this.formulario.get("Schedules") as FormArray;
    items.push(new FormControl(this.patientSelected.Schedules[this.patientSelected.Schedules.length-1]));

  }

  RemoveSchedule(index : number) : void
  {
    this.patientSelected.Schedules.splice(index,1) ;
    (<FormArray>this.formulario.get('Schedules')).removeAt(index);
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
