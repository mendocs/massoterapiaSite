import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import {patient} from "../models/patient.model";
import { patientForm } from '../models/patientViewModelForm.model';
import { patientList } from '../models/patientviewModelList.model';
import { patientSaved } from "../models/patientSavedResult.model";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  public removedor$: Subject<any> = new Subject<string>();

  private lastCreatedPatient : patientList[];


  createPatient( newPatient : patientForm) : Observable<patientList[]> {
    return this.http.get<patientList[]>('assets/data/patient1.json')
        .pipe(tap(results => this.lastCreatedPatient = results));
  }


  lastPatientList() : patientList[] {
    return this.lastCreatedPatient;
  }

  searchPatient( newPatient : patientForm) : Observable<patientList[]> {
    return this.http.get<patientList[]>('assets/data/patient.json')
    .pipe(tap(results => this.lastCreatedPatient = results));

  }

  getPatientById (id: string) : Observable<patient> {
    return this.http.get<patient>('assets/data/patientFull.json');
  }

  savePatient (patientData: patient) : Observable<patientSaved> {
    return this.http.get<patientSaved>('assets/data/patientSave.json');
  }

  removeSchedule ( scheduleSelected : number)
  {
    this.removedor$.next(scheduleSelected);
  }


}
