import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isUserAuthenticated : boolean = false;
  private userAuthenticated : string;
  constructor() { }

  isAuthenticated() : boolean
  {

    return this.isUserAuthenticated;
  }

  authenticate(user: string, password : string) : boolean
  {

      if (user === "aaaaa" && password === "aaaaa")
      {
        this.userAuthenticated = user;
        this.isUserAuthenticated = true;
        return true;
      }

      return false;
  }


}
