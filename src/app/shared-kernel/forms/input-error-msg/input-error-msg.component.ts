import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormValidations } from '../core/form-validations';

@Component({
  selector: 'app-error-msg',
  templateUrl: './input-error-msg.component.html',
  styleUrls: ['./input-error-msg.component.scss']
})
export class InputErrorMsgComponent implements OnInit {

	@Input() control: FormControl;
	@Input() label: string;

	constructor() { }

	ngOnInit() {
	}

	get errorMessage() {

	  for (const propertyName in this.control.errors) {

		if (this.control.errors.hasOwnProperty(propertyName)
			&&	this.control.touched
			) {

			return FormValidations.getErrorMsg(this.label, propertyName, this.control.errors[propertyName]);
		  }
	  }

	  return null;
	}
}
