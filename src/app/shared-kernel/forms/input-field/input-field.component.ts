import { Component, Self, HostListener, OnInit } from '@angular/core';

import {  forwardRef, HostBinding, Input } from '@angular/core';

import { FormGroup, FormControl, Validators, NgControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


const INPUT_FIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputFieldComponent),
  multi: true
};

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  host: {'(blur)': '_onTouched()'},
  providers: [INPUT_FIELD_VALUE_ACCESSOR]
})
export class InputFieldComponent implements ControlValueAccessor  {


  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }



	@Input() classeCss;
	@Input() id: string;
	@Input() label: string;
	@Input() type = 'text';
	@Input() control;
	@Input() isReadOnly = false;
  @Input() mask="";
  @Input() placeholder="";


	checked: boolean = false;



	private innerValue: any;

	get value() {
	  return this.innerValue;
	}

	set value(v: any) {

	  if (v !== this.innerValue) {
		this.innerValue = v;
		this.onChangeCb(v);

	  }
	}



	onChangeCb: (_: any) => void = () => {};
	//onTouchedCb: (_: any) => void = () => {};
	onTouchedCb: () => void = () => {};



	writeValue(v: any): void {
	  this.value = v;
	}

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
		this.control.markAsUntouched();
	}

	setDisabledState?(isDisabled: boolean): void {
	  this.isReadOnly = isDisabled;
	}

	onChange(event) {
		if (this.type == "checkbox")
		{
			this.value =  event.target.checked;
		}

	}

	isValido()
	{

		return this.control.valid;
		//return (this.value == "nome1")

	}

}



