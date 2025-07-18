import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { Subscription } from 'rxjs';
import { PublicSiteService } from 'src/app/public-site/public-site.service';
import { section } from 'src/app/section/models/Isection';
import { BaseComponent } from 'src/app/shared-kernel/components/base-component';
import { therapyCategory } from 'src/app/therapy/models/therapy-category-model';
import { therapy } from 'src/app/therapy/models/therapy-model';
import { TherapyDataService } from 'src/app/therapy/services/therapy-data.service';


@Component({
  selector: 'app-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.scss'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class TopToolbarComponent extends BaseComponent implements OnInit {

  pathsFirst= ["Sobre"];
  pathsLast= ["Espaço e Terapeuta", "Pacotes","Contato e Localização", "Blog"];


  isCollapsed = true;


  therapies : therapyCategory[];

  sections : section[] ;

  getAllTherapiesSubscription$ : Subscription;

  therapiesFile = {
		next: (_therapies : therapyCategory[]) => this.populateControlsFromTherapies(_therapies),
		error: err => this.getError(err),
		complete: () => {},
	  };


  constructor(private publicSiteService: PublicSiteService,
              private therapyDataService : TherapyDataService,
              private router: Router) { super(); }

  ngOnInit(): void {
    this.sections = this.publicSiteService.sections;

    this.getAllTherapiesSubscription$ =  this.therapyDataService.getAlltherapyCategories$().subscribe(this.therapiesFile);
  }

  ngOnDestroy() : void{
    this.getAllTherapiesSubscription$?.unsubscribe();
  }

  populateControlsFromTherapies(_therapies: therapyCategory[]){
    this.therapies = _therapies;
  }

  navigateTo(navigateId: string){
    this.isCollapsed = true;
    this.publicSiteService.navigateTo(navigateId);
  }

  toggleCollapsed() {
	  this.isCollapsed = !this.isCollapsed;
  }


  public triggerScrollTo(destination : string) {
    this.publicSiteService.triggerScrollTo(destination);
  }

}
