import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {BaseFormComponent} from "../../shared-kernel/forms/core/base-form.component";
import { AuthService } from '../services/auth.service';
import { loginResult} from "../models/loginResult"
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseFormComponent implements OnInit  {

  loginObserver = {
		next: (LoginResult : loginResult) => this.submitResult(LoginResult),
		error: err => this.getError(err),
		complete: () => {},
	  };

  authenticateSubscription$ : Subscription;

  constructor(private router: Router,
              private authService : AuthService,
              private _titleService: Title) { super() }

  ngOnInit(): void {

    this._titleService.setTitle("Massoterapia Admin - Login");

    this.formulario =
		new FormGroup (
			{
				password : new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
				user:  new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(35)]),
			}
		)

  }

  submit(): void {

    this.isLoading = true;

    this.authenticateSubscription$ = this.authService.authenticate$(this.formulario.get("user").value, this.formulario.get("password").value).subscribe(this.loginObserver);

  }

  ngOnDestroy() : void{
    this.authenticateSubscription$?.unsubscribe();
  }



  submitResult(LoginResult : loginResult) : void {

    if (LoginResult.result)
    {
      this.router.navigate(["/admin"]);
    }
    else
    {
      this.messageError =  "Usuário ou senha inválidos";
      this.isError = true;
      this.isLoading = false;
    }
  }


  submitFail(): void
  {
  }


}
