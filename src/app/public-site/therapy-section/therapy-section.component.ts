import { Component, OnInit } from '@angular/core';
import { PublicSiteService } from '../public-site.service';
import {therapy} from "../../therapy/models/therapy-model";
import { TherapyDataService } from 'src/app/therapy/services/therapy-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommomComponentsService } from 'src/app/common-components/commom-components.service';

@Component({
  selector: 'app-therapy-section',
  templateUrl: './therapy-section.component.html',
  styleUrls: ['./therapy-section.component.scss']
})
export class TherapySectionComponent implements OnInit {

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


   therapiesFile = {
		next: (selectedTherapy : therapy[]) => this.populateControlsFromSelectedTherapy(selectedTherapy),
		error: err => this.getError(err),
		complete: () => {},
	  };




  constructor(private publicSiteService: PublicSiteService, private therapyDataService : TherapyDataService, private _CommomComponentsService : CommomComponentsService) { }

  ngOnInit(): void {
      this.publicSiteService.selectTherapy$.subscribe( valor =>
      this.therapyDataService.getTherapyByName(valor).subscribe(this.therapiesFile));

      this.phoneContactMask = this._CommomComponentsService.phoneContactMask;
      this.phoneContactNoMask = this._CommomComponentsService.phoneContactNoMask;
      this.whatsapplink = this._CommomComponentsService.whatsapplink;

  }

  getError(err : HttpErrorResponse): void{
    console.log(err);
  }


  populateControlsFromSelectedTherapy(selectedTherapy: therapy[]) : void
  {

    if (selectedTherapy.length > 0)
    {
      this.isSomeTherapySelected = true;
      this.selectedTherapy = selectedTherapy[0].id;

      this.therapyBenefitsTitle = selectedTherapy[0].beneficiosTitulo;
      this.therapyInformationTitle = selectedTherapy[0].outrasInformacoesTitulo;
      this.therapyBackground = selectedTherapy[0].background;
      this.therapyTextShort = selectedTherapy[0].resumido;
      this.therapyTextLong = selectedTherapy[0].detalhado;
      this.therapyBenefits = selectedTherapy[0].beneficios;
      this.therapyInformation= selectedTherapy[0].outrasInformacoes;
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
