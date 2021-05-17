import { Component } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class AppComponent {


  //paths= ["primeiro","diretivas","add","observer","disparador2","forms/driven","boot"];

  isCollapsed = true;

  toggleCollapsed() {
	  this.isCollapsed = !this.isCollapsed;
  }

}
