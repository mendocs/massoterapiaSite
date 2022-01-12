import { Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';



import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import {BaseFormComponent} from "../../shared-kernel/forms/core/base-form.component";

import * as _moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputFieldComponent } from 'src/app/shared-kernel/forms/input-field/input-field.component';
import { schedule } from '../patient-data/models/schedule.model';
import { PatientService } from '../patient-data/services/patient.service';
import { UtilsService } from 'src/app/shared-kernel/tools/utils.service';
import { TherapyDataService } from 'src/app/therapy/services/therapy-data.service';
import { Observable } from 'rxjs';
import { therapy } from 'src/app/therapy/models/therapy-model';
import { pack } from 'src/app/therapy/models/pack-model';
import { MatSelect } from '@angular/material/select';
import { BaseComponent } from 'src/app/shared-kernel/components/base-component';

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


const SCHEDULE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ScheduleRegisterComponent),
  multi: true
};


@Component({
  selector: 'app-schedule-register',
  templateUrl: './schedule-register.component.html',
  styleUrls: ['./schedule-register.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},

    SCHEDULE_VALUE_ACCESSOR
  ],
})
export class ScheduleRegisterComponent extends BaseComponent implements OnInit , ControlValueAccessor  {

  @Input() index: number;
  @Input() readonly: boolean = true;
  @Input() removeButtonActive: boolean = true;

  ismeridian: boolean = false;
  innerValue: schedule = new schedule();
  timepicker : Date;
  endTime : Date;
  endTimeFormated : string;

  selectedTherapy : string;
  selectedTherapyObj : therapy;
  selectedPlan : string;
  selectedPlanObj : pack;

  allTherapy$: Observable<therapy[]>;
  allPlans$: Observable<pack[]>;

  protocolFile = {
		next: (selectedTherapy : therapy) => this.selectTherapy(selectedTherapy),
		error: err => this.getError(err),
		complete: () => {},
	  };

  planFile = {
    next: (selectedPlan : pack) => this.selectPlan(selectedPlan),
    error: err => this.getError(err),
    complete: () => {},
    };

    constructor(private patientService : PatientService,
                private utilsService : UtilsService,
                private therapyDataService : TherapyDataService){super();}


    get value() {
      return this.innerValue;
    }

    set value(v: any) {
      if (v !== this.innerValue) {
        //this.formulario.patchValue(v);
          this.innerValue = v;
          this.innerValue.StartdDate = new Date (this.innerValue.StartdDate);
          this.timepicker = new Date (this.innerValue.StartdDate);

          this.innerValue.Protocol = this.innerValue.Protocol ? this.innerValue.Protocol : "--Nenhum--";
          this.innerValue.Package = this.innerValue.Package ? this.innerValue.Package : "--Nenhum--";
          this.selectedPlan = this.innerValue.Package;
          this.selectedTherapy = this.innerValue.Protocol;

          this.sincronizeEndTime();
          this.onChangeCb(v);
        }
    }



    removeMySelf()
    {
        this.patientService.removeSchedule(this.index);
    }


    ngOnInit(): void {
      this.allTherapy$ = this.therapyDataService.getAlltherapy();
      this.allPlans$ = this.therapyDataService.getAllPacks();
    }

    writeValue(v: any): void {
      this.value = v;
    }

    onChange(event) {

    }

    onChangeCb: (_: any) => void = () => {};
    //onTouchedCb: (_: any) => void = () => {};
    onTouchedCb: () => void = () => {};


    registerOnChange(fn: any): void {
      this.onChangeCb = fn;
    }

    registerOnTouched(fn: any): void {
      this.onTouchedCb = fn;
    }

    onBlur()
    {
      this.onTouchedCb();
    }

    onFocus(){
      //this.control.markAsUntouched();
    }

    setDisabledState?(isDisabled: boolean): void {
      //this.isReadOnly = isDisabled;
    }


    isValido()
    {

    }

    calculatePrice() : void
    {

      if (this.innerValue.Protocol !== "--Nenhum--"){
        this.innerValue.Price = this.selectedTherapyObj.preco;
      }

      if (this.innerValue.Package !== "--Nenhum--"){
        this.innerValue.Price = this.selectedPlanObj.preco / this.selectedPlanObj.sessoes;
      }
    }

    sincronizeEndTime() : void
    {
      //this.endTime = this.innerValue.StartdDate;
      this.endTime = new Date(this.innerValue.StartdDate.getTime() + (this.innerValue.Duration * 60 * 1000));
      this.innerValue.EndDate = this.endTime;
      this.endTimeFormated = this.utilsService.getDateFormatedHourMinutes(this.endTime);
    }


    sincronizeSchedule() : void
    {
      this.innerValue.StartdDate = new Date (this.innerValue.StartdDate);
      this.innerValue.StartdDate.setHours(this.timepicker.getHours());
      this.innerValue.StartdDate.setMinutes(this.timepicker.getMinutes());
      this.sincronizeEndTime();
    }


    protocolChange(value : string) : void
    {
      if (value === "--Nenhum--"){
        this.innerValue.Protocol = value;
        this.calculatePrice();
      }
      else
        this.therapyDataService.getTherapybyTitle(value).subscribe(this.protocolFile);

    }

    selectTherapy(_therapy : therapy): void
    {
      this.innerValue.Duration = _therapy.duracao;
      this.innerValue.Protocol = _therapy.titulo_reduzido
      this.selectedTherapyObj = _therapy;
      this.calculatePrice();
      this.sincronizeEndTime();
    }

    selectPlan(_plan : pack): void
    {
      this.innerValue.Package = _plan.titulo;
      this.selectedPlanObj = _plan;
      this.calculatePrice();
      this.sincronizeEndTime();
    }

    planChange(value : string) : void
    {
      if (value === "--Nenhum--"){
        this.innerValue.Package = value;
        this.calculatePrice();
      }
      else
        this.therapyDataService.getPlanbyTitle(value).subscribe(this.planFile);
    }

}
