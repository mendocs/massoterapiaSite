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
import { Observable, Subscription } from 'rxjs';
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

  selectedProtocol : string;
  selectedProtocolObj : therapy;
  selectedPack : string;
  selectedPackObj : pack;

  allProtocol: therapy[];
  allPacks: pack[];

  //allTherapy$: Observable<therapy[]>;
  //allPlans$: Observable<pack[]>;

  allTherapySubscription$ : Subscription;
  allPackSubscription$ : Subscription;

  displayShort : boolean;

  allProtocolFile = {
		next: (_therapies : therapy[]) => this.getProtocols(_therapies),
		error: err => this.getError(err),
		complete: () => {},
	  };

  allPackFile = {
    next: (_packs : pack[]) => this.getPacks(_packs),
    error: err => this.getError(err),
    complete: () => {},
    };

  protocolFile = {
		next: (selectedTherapy : therapy) => this.selectProtocol(selectedTherapy),
		error: err => this.getError(err),
		complete: () => {},
	  };

  packFile = {
    next: (selectedPlan : pack) => this.selectPack(selectedPlan),
    error: err => this.getError(err),
    complete: () => {},
    };

    constructor(private patientService : PatientService,
                private utilsService : UtilsService,
                private therapyDataService : TherapyDataService){super(); }


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
          this.selectedPack = this.innerValue.Package;
          this.selectedProtocol = this.innerValue.Protocol;

          this.sincronizeEndTime();
          this.onChangeCb(v);
          this.allPackSubscription$ = this.therapyDataService.getAllPacks().subscribe(this.allPackFile);
          this.allTherapySubscription$ = this.therapyDataService.getAlltherapy().subscribe(this.allProtocolFile);
          this.displayShort = (this.innerValue.Executed || this.innerValue.Canceled) && (!this.readonly && this.removeButtonActive);
        }
    }

    addProtocolOld(oldProtocol : string, preco : number, duracao : number) : void
    {
      let oldTherapy : therapy = new therapy(oldProtocol,preco,duracao);

      this.allProtocol.push(oldTherapy);
      this.selectedProtocolObj = oldTherapy;
    }

    addPackOld(oldPackTitle : string, preco : number) : void
    {
      let _oldPack : pack = new pack(oldPackTitle,preco);

      this.allPacks.push(_oldPack);
      this.selectedPackObj = _oldPack;

    }

    removeMySelf()
    {
        this.patientService.removeSchedule(this.index);
    }


    ngOnInit(): void {

      //this.readonly = false;
      //this.allTherapy$ = this.therapyDataService.getAlltherapy();


      //this.allPlans$ = this.therapyDataService.getAllPacks();


    }

    ngOnDestroy() : void {
      this.allTherapySubscription$?.unsubscribe();
      this.allPackSubscription$?.unsubscribe();
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
        this.innerValue.Price = this.selectedProtocolObj.preco;
      }

      if (this.innerValue.Package !== "--Nenhum--"){
        this.innerValue.Price = this.selectedPackObj.preco / this.selectedPackObj.sessoes;
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




    getProtocols(_protocols : therapy[]) : void
    {

      this.allProtocol = _protocols;

      if (this.innerValue.Protocol != "--Nenhum--" && !this.allProtocol.some(searchElement => searchElement.titulo_reduzido === this.innerValue.Protocol))
        this.addProtocolOld(this.innerValue.Protocol, this.innerValue.Price, this.innerValue.Duration);
      else
        this.selectedProtocolObj = this.allProtocol.find(searchElement => searchElement.titulo_reduzido == this.innerValue.Protocol);
    }

    getPacks(_packs : pack[]) : void
    {

      this.allPacks = _packs;

      if (this.innerValue.Package != "--Nenhum--" && !this.allPacks.some(searchElement => searchElement.titulo === this.innerValue.Package))
        this.addPackOld(this.innerValue.Package, this.innerValue.Price);
      else
        this.selectedPackObj = this.allPacks.find(searchElement => searchElement.titulo == this.innerValue.Package);

    }

    selectProtocol(_protocol : therapy): void
    {
      if (_protocol){
        this.innerValue.Duration = _protocol.duracao;
        this.innerValue.Protocol = _protocol.titulo_reduzido;
        this.selectedProtocolObj = _protocol;
      }
      else{
        this.innerValue.Duration = this.allProtocol[this.allProtocol.length-1].duracao;
        this.innerValue.Protocol = this.allProtocol[this.allProtocol.length-1].titulo_reduzido;
        this.selectedProtocolObj = this.allProtocol[this.allProtocol.length-1];
      }
      this.calculatePrice();
      this.sincronizeEndTime();
    }

    selectPack(_pack : pack): void
    {

      if (_pack){
        this.innerValue.Package = _pack.titulo;
        this.selectedPackObj = _pack;
      }
      else{
        this.innerValue.Package = this.allPacks[this.allPacks.length-1].titulo;
        this.selectedPackObj = this.allPacks[this.allPacks.length-1];
      }
      this.calculatePrice();
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

    packChange(value : string) : void
    {
      if (value === "--Nenhum--"){
        this.innerValue.Package = value;
        this.calculatePrice();
      }
      else
        this.therapyDataService.getPackbyTitle(value).subscribe(this.packFile);
    }

    getDateShort(dateTobeShorted) : string {
      return this.utilsService.getDateFormated(dateTobeShorted);
    }

}
