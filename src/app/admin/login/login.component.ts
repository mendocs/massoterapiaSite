import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {BaseFormComponent} from "../../shared-kernel/forms/core/base-form.component";
import { AuthService } from '../services/auth.service';
import { loginResult} from "../models/loginResult"
import { HttpErrorResponse } from '@angular/common/http';

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

   messageError : string;
   isLoading : boolean = false;

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

    this.isLoading = true;

    this.authService.authenticate(this.formulario.get("user").value, this.formulario.get("password").value).subscribe(this.loginObserver);

  }

  getError(err : HttpErrorResponse): void{

    this.messageError =  "Sem conexão com o Servidor ";
    this.authenticatefail = true;
    this.isLoading = false;
  }

  submitResult(LoginResult : loginResult)
  {


    if (LoginResult.result)
    {
      this.router.navigate(["/admin"]);
    }
    else
    {
      this.messageError =  "Usuário ou senha inválidos";
      this.authenticatefail = true;
      this.isLoading = false;
    }
  }


  submitFail(): void
  {

  }


}
