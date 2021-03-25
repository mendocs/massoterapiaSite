import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';

import { InputFieldComponent } from './input-field/input-field.component';
import { InputErrorMsgComponent } from "./input-error-msg/input-error-msg.component";
import { FormDebugComponent } from './form-debug/form-debug.component';

import { MaterialModule } from '../material/material.module';

import { NgxMaskModule, IConfig } from 'ngx-mask';


const maskConfig: Partial<IConfig> = {
  validation: false,
};


@NgModule({
  declarations: [InputFieldComponent, InputErrorMsgComponent, FormDebugComponent],
  imports: [
    CommonModule,
	  ReactiveFormsModule,
	  FormsModule,
    MaterialModule,
    NgxMaskModule.forRoot()
  ],
  exports : [ InputFieldComponent, FormDebugComponent, MaterialModule, ReactiveFormsModule, FormsModule, NgxMaskModule ]
})
export class FormBaseModule { }
