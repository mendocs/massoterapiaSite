import { Component, OnInit } from '@angular/core';
import { PublicSiteService } from '../public-site.service';
import {therapy} from "../../therapy/models/therapy-model";
import { TherapyDataService } from 'src/app/therapy/services/therapy-data.service';
import { HttpErrorResponse } from '@angular/common/http';

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
  therapyBackground: string = "";
  therapyTextShort: string = "";
  therapyTextLong: string = "";
  therapyBenefits: string[];
  therapyInformation: string[];


   therapiesFile = {
		next: (selectedTherapy : therapy[]) => this.populateControlsFromSelectedTherapy(selectedTherapy),
		error: err => this.getError(err),
		complete: () => {},
	  };




  constructor(private publicSiteService: PublicSiteService, private therapyDataService : TherapyDataService) { }

  ngOnInit(): void {
      this.publicSiteService.selectTherapy$.subscribe( valor =>
      this.therapyDataService.getTherapyByName(valor).subscribe(this.therapiesFile));

      this.phoneContactMask = this.publicSiteService.phoneContactMask;
      this.phoneContactNoMask = this.publicSiteService.phoneContactNoMask;
      this.whatsapplink = this.publicSiteService.whatsapplink;

  }

  getError(err : HttpErrorResponse): void{
    console.log(err);
  }


  populateControlsFromSelectedTherapy(selectedTherapy: therapy[]) : void
  {

    if (selectedTherapy.length > 0)
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


  goBackTherapy(): void
  {
    this.publicSiteService.goBackTherapy();
  }

  verifyBackPossibilit(): boolean
  {
    return this.publicSiteService.verifyBackPossibilit();
  }



}
