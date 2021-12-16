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

    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},

    SCHEDULE_VALUE_ACCESSOR
  ],
})
export class ScheduleRegisterComponent implements OnInit , ControlValueAccessor  {

  @Input() index: number;
  @Input() readonly: boolean = true;

  @ViewChild('scheduletime') scheduletime: any;

  ismeridian: boolean = false;
  innerValue: schedule = new schedule;
  timepicker : Date;
  endTime : Date;
  endTimeFormated : string;


  constructor(private patientService : PatientService,
              private utilsService : UtilsService) { }


	get value() {
	  return this.innerValue;
	}

	set value(v: any) {

    if (v !== this.innerValue) {
      //this.formulario.patchValue(v);
      this.innerValue = v;
      this.innerValue.StartdDate = new Date (this.innerValue.StartdDate);
      this.timepicker = new Date (this.innerValue.StartdDate);
      this.sincronizeEndTime();

      this.onChangeCb(v);
      }
	}

  removeMySelf()
  {
      this.patientService.removeSchedule(this.index);
  }


  ngOnInit(): void {

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

sincronizeEndTime() : void
{
  //this.endTime = this.innerValue.StartdDate;
  this.endTime = new Date(this.innerValue.StartdDate.getTime() + (this.innerValue.Duration * 60 * 1000))
  this.endTimeFormated = this.utilsService.getDateFormatedHourMinutes(this.endTime);
}


sincronizeSchedule() : void
{
  this.innerValue.StartdDate = new Date (this.innerValue.StartdDate);
  this.innerValue.StartdDate.setHours(this.timepicker.getHours());
  this.innerValue.StartdDate.setMinutes(this.timepicker.getMinutes());
  this.sincronizeEndTime();
}


}
