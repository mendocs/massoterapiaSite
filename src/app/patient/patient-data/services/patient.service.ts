import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import {patient} from "../models/patient.model";
import { patientForm } from '../models/patientViewModelForm.model';
import { patientList } from '../models/patientviewModelList.model';
import { patientSaved } from "../models/patientSavedResult.model";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  public removedor$: Subject<any> = new Subject<string>();

  private lastCreatedPatient : patientList[];

  private lastCreatedPatientStatusCode : number = 0;
  private lastUpdatePatientStatusCode : number = 0;
  private  lastGetPatientByIdStatusCode : number = 0;



  private initializeLastsVariables()
  {
    this.lastCreatedPatient = [];
    this.lastCreatedPatientStatusCode  = 0;
    this.lastUpdatePatientStatusCode  = 0;
    this.lastGetPatientByIdStatusCode  = 0;
  }

  createPatient( newPatient : patientForm) : Observable<patientList[]> {
    this.initializeLastsVariables();
    return this.http.post <patientList[]> (environment.UrlApi + 'patient', newPatient, {observe: 'response'})
        .pipe(
          tap(results =>  this.lastCreatedPatient= results.body),
          tap(results =>  this.lastCreatedPatientStatusCode= results.status),
          map (results => results.body )
        );
  }


  lasPatientCreateStatus() : number{
    return this.lastCreatedPatientStatusCode;
  }

  lastGetPatientByIdStatus() : number{
    return this.lastGetPatientByIdStatusCode;
  }

  lastUpdatePatientStatus() : number{
    return this.lastUpdatePatientStatusCode;
  }


  lastPatientList() : patientList[] {
    return this.lastCreatedPatient;
  }

  private FormatDateTimeToQuery(datetoFormat: Date): string
  {
    let returnValue = `${datetoFormat.getFullYear()}-${datetoFormat.getMonth()+1}-${datetoFormat.getDate()}`;
    return returnValue;
  }

  searchPatient( newPatient : patientForm) : Observable<patientList[]> {

    this.initializeLastsVariables();
    let parametersSerach : string = "";

    parametersSerach +=  newPatient.name ? `name=${newPatient.name}&` : "";
    parametersSerach +=  newPatient.phone ? `phone=${newPatient.phone}&` : "";

    if (newPatient.scheduledateRange)
    {
      parametersSerach +=  newPatient.scheduledateRange[0] ? `dateStart=${this.FormatDateTimeToQuery(newPatient.scheduledateRange[0])}&` : "";
      parametersSerach +=  newPatient.scheduledateRange[1] ? `dateEnd=${this.FormatDateTimeToQuery(newPatient.scheduledateRange[1])}&` : "";
    }

    if (parametersSerach)
      parametersSerach = parametersSerach.replace("/","-").replace(" ","%20").substring(0,parametersSerach.length + 1);


    return this.http.get<patientList[]>(environment.UrlApi + "patient/search?" + parametersSerach)
    .pipe(tap(results => this.lastCreatedPatient = results));

  }

  getPatientById (key: string) : Observable<patient> {
    //return this.http.get<patient>('assets/data/patientFull.json');
    return this.http.get<patient>(environment.UrlApi + 'patient/getkey/' + key, {observe: 'response'})
    .pipe(
      tap(results =>  this.lastGetPatientByIdStatusCode = results.status),
      map (results => results.body )
    );
  }

  updatePatient (patientData: patient) : Observable<number> {
    return this.http.put <number> (environment.UrlApi + 'patient', patientData, {observe: 'response'})
        .pipe(
          tap(results =>  this.lastUpdatePatientStatusCode= results.status),
          map (results => results.body )
        );
  }

  removeSchedule ( scheduleSelected : number)
  {
    this.removedor$.next(scheduleSelected);
  }


}
