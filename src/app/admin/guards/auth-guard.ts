import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, Route, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private router: Router, private authService: AuthService) {}

  canActivate(): boolean {

    //return true;

    if (this.authService.isAuthenticated()){
      return true;}
    else
    {
      this.router.navigate(["/admin/login"]);
      return false;
    }



  }
}
