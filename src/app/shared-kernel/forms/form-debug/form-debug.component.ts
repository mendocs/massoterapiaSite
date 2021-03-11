import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-debug',
  templateUrl: './form-debug.component.html',
  styleUrls: ['./form-debug.component.scss']
})
export class FormDebugComponent implements OnInit {

	@Input() form;

	valueSubmit: string;


  constructor() { }

  ngOnInit(): void {
  }

ValuesSubmit()
{
	this.valueSubmit = Object.assign({}, this.form.value);


/*
    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
      .map((v, i) => v ? this.frameworks[i] : null)
      .filter(v => v !== null)
	});
	*/

}

}
