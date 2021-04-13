import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {BaseFormComponent} from "../../shared-kernel/forms/core/base-form.component";
import { AuthService } from '../services/auth.service';
import { loginResult} from "../models/loginResult"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseFormComponent implements OnInit  {

  loginObserver = {
		next: (LoginResult : loginResult) => this.submitResult(LoginResult),
		error: err => {this.messageError =  "Sem conexão com o Servidor "; this.authenticatefail = true},
		complete: () => {},
	  };

   messageError : string;

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

    this.authService.authenticate(this.formulario.get("user").value, this.formulario.get("password").value).subscribe(this.loginObserver);

/*
    if (this.authService.authenticate( this.formulario.get("user").value, this.formulario.get("password").value ))
      this.router.navigate(["/admin"]);
    else
      this.authenticatefail = true;
*/
  }

  submitResult(LoginResult : loginResult)
  {

    console.log(LoginResult.result);

    if (LoginResult.result)
    {
      console.log("admin");
      this.router.navigate(["/admin"]);
    }
    else
    {
      this.messageError =  "Usuário ou senha inválidos";
      this.authenticatefail = true;
    }
  }


  submitFail()
  {

  }


}
