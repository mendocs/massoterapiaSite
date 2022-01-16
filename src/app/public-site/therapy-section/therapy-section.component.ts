import { Component, OnInit } from '@angular/core';
import { PublicSiteService } from '../public-site.service';
import {therapy} from "../../therapy/models/therapy-model";
import { TherapyDataService } from 'src/app/therapy/services/therapy-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommomComponentsService } from 'src/app/common-components/commom-components.service';
import { Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { BaseComponent } from 'src/app/shared-kernel/components/base-component';

@Component({
  selector: 'app-therapy-section',
  templateUrl: './therapy-section.component.html',
  styleUrls: ['./therapy-section.component.scss']
})
export class TherapySectionComponent extends BaseComponent implements OnInit {

  isVisible : boolean = false;

  phoneContactMask : string;
  phoneContactNoMask : string;
  whatsapplink : string;


  isCollapsed:boolean = true;
  isSomeTherapySelected:boolean = false;

  selectedTherapy: string = "";
  therapyBenefitsTitle: string = "";
  therapyInformationTitle: string = "";
  therapyBackground: string = "vazio";
  therapyTextShort: string = "";
  therapyTextLong: string = "";
  therapyBenefits: string[];
  therapyInformation: string[];

  selectTherapySubscription$ : Subscription;
  SubscriptionAlive = true;


   therapiesFile = {
		next: (selectedTherapy : therapy) => this.populateControlsFromSelectedTherapy(selectedTherapy),
		error: err => this.getError(err),
		complete: () => {},
	  };



  constructor(private publicSiteService: PublicSiteService, private therapyDataService : TherapyDataService, private _CommomComponentsService : CommomComponentsService) { super(); }

  ngOnInit(): void {
      this.selectTherapySubscription$ = this.publicSiteService.selectTherapy$.subscribe( valor =>
            this.therapyDataService.getTherapyByName(valor).pipe(takeWhile(() => this.SubscriptionAlive)).subscribe(this.therapiesFile));


      this.phoneContactMask = this._CommomComponentsService.phoneContactMask;
      this.phoneContactNoMask = this._CommomComponentsService.phoneContactNoMask;
      this.whatsapplink = this._CommomComponentsService.whatsapplink;

  }


  ngOnDestroy() : void{
    this.selectTherapySubscription$?.unsubscribe();
    this.SubscriptionAlive = false;
  }

  populateControlsFromSelectedTherapy(selectedTherapy: therapy) : void
  {

    if (selectedTherapy)
    {
      this.isVisible = true;
      this.isSomeTherapySelected = true;
      this.selectedTherapy = selectedTherapy.titulo;

      this.therapyBenefitsTitle = selectedTherapy.beneficiosTitulo;
      this.therapyInformationTitle = selectedTherapy.outrasInformacoesTitulo;
      this.therapyBackground = selectedTherapy.background;
      this.therapyTextShort = selectedTherapy.resumido;
      this.therapyTextLong = selectedTherapy.detalhado;
      this.therapyBenefits = selectedTherapy.beneficios;
      this.therapyInformation= selectedTherapy.outrasInformacoes;
    }

  }


  goBackTherapy(): void
  {
    this.publicSiteService.goBackTherapy();
  }

  verifyBackPossibilit(): boolean
  {
    return this.publicSiteService.verifyBackPossibilit();
  }



}
