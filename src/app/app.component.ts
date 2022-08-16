import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
declare const gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class AppComponent {

  isCollapsed = true;

  constructor(public router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'G-5YJTERYP2K', { 'page_path': event.urlAfterRedirects });
      }
    })
  }



  toggleCollapsed() {
	  this.isCollapsed = !this.isCollapsed;
  }

}
