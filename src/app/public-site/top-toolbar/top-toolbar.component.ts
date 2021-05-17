import { HttpErrorResponse } from '@angular/common/http';
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

  pathsFirst= ["Sobre"];
  pathsLast= ["Espaço e Terapeuta", "Valores","Contato e Localização"];


  isCollapsed = true;


  therapies : therapy[];

  sections : section[] ;

  therapiesFile = {
		next: (_therapies : therapy[]) => this.populateControlsFromTherapies(_therapies),
		error: err => this.getError(err),
		complete: () => {},
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

  getError(err : HttpErrorResponse): void{
    console.log(err);
  }

  navigateTo(navigateId: string)
  {

    this.isCollapsed = true;

    //para dar tempo do navbar fechar, ajustar o scroll e depois posicionar
    setTimeout(()=>{


      if (navigateId.includes("spied"))
      this.triggerScrollTo(navigateId)
    else
      this.publicSiteService.SetTherapy(navigateId);


 }, 200);


  }

  toggleCollapsed() {
	  this.isCollapsed = !this.isCollapsed;

  }


  public triggerScrollTo(destination : string) {

    this.publicSiteService.triggerScrollTo(destination);

  }

}
