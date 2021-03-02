import { Component, OnInit } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { section } from 'src/app/section/models/Isection';
import { therapy } from 'src/app/therapy/models/therapy-model';
import { TherapyDataService } from 'src/app/therapy/services/therapy-data.service';
import { PublicSiteService } from '../public-site.service';

@Component({
  selector: 'app-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.scss'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class TopToolbarComponent implements OnInit {

  pathsFirst= ["Sobre","Espaço e Terapeuta"];
  pathsLast= ["Valores","Contato e Localização"];


  isCollapsed = true;

  therapies : therapy[];

  sections : section[] ;

  therapiesFile = {
		next: (_therapies : therapy[]) => this.populateControlsFromTherapies(_therapies),
		error: err => console.log(err),
		complete: () => console.log(''),
	  };


  constructor(private publicSiteService: PublicSiteService,private therapyDataService : TherapyDataService) { }

  ngOnInit(): void {
    this.sections = this.publicSiteService.sections;

    this.therapyDataService.getAllTherapies().subscribe(this.therapiesFile);
  }

  populateControlsFromTherapies(_therapies: therapy[])
  {
    this.therapies = _therapies;
  }

  navigateTo(navigateId: string)
  {
    if (navigateId.includes("spied"))
      this.triggerScrollTo(navigateId)
    else
      this.publicSiteService.SetTherapy(navigateId);
  }

  toggleCollapsed() {
	  this.isCollapsed = !this.isCollapsed;
	  console.log(this.isCollapsed);
  }


  public triggerScrollTo(destination : string) {

    this.publicSiteService.triggerScrollTo(destination);

  }

}
