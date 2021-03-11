import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {BaseFormComponent} from "../../shared-kernel/forms/core/base-form.component";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseFormComponent implements OnInit  {


  authenticatefail : boolean = false;

  constructor(private router: Router, private authService : AuthService) { super() }

  ngOnInit(): void {

    this.formulario =
		new FormGroup (
			{
				password : new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
				user:  new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(35)]),
			}
			)

  }

  submit(): void {


    if (this.authService.authenticate( this.formulario.get("user").value, this.formulario.get("password").value ))
      this.router.navigate(["/admin"]);
    else
      this.authenticatefail = true;

  }

  submitFail()
  {

  }


}
