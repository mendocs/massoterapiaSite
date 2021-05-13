import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { Observable } from 'rxjs';
import { loginResult} from "../models/loginResult"
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isUserAuthenticated : boolean = false;
  private userAuthenticated : string;
  constructor(private http: HttpClient) { }

  isAuthenticated() : boolean
  {
    return this.isUserAuthenticated;
  }


  authenticate(name: string, password : string) : Observable<{}>
  {

    let user = {
      name: name,
      password_Text: password
    };

    return this.http.post<loginResult>(environment.UrlApi + "user", user)
    .pipe(tap((results) => {
      this.userAuthenticated = name;
      this.isUserAuthenticated = (<loginResult>results).result;
    }));
  }
}
