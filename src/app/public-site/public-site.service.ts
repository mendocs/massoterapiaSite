import { Injectable } from '@angular/core';
import { ScrollToConfigOptions, ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { Subject } from 'rxjs';
import { section } from '../section/models/Isection';

@Injectable({
  providedIn: 'root'
})
export class PublicSiteService {

  public selectTherapy$: Subject<string> = new Subject<string>();

  therapyListVisited : string[] = [];


  public currentSection:string = 'home_spied';

  constructor(private _scrollToService: ScrollToService) {

  }


  public sections :section[] =
  [
    {name: "Inicio", nameSpied: "home_spied"},
    {name: "Terapias", nameSpied: "tag_cloud_spied"},
    {name: "Terapeuta", nameSpied: "therapist_spied"},
    {name: "Valores", nameSpied: "price_spied"},
    {name: "Contato", nameSpied: "contact_spied"},
    {name: "Blog", nameSpied: "blog_ext"}
  ]



  verifyBackPossibilit():boolean
  {
    return (this.therapyListVisited.length > 1);
  }




  goBackTherapy()
  {
    if (this.therapyListVisited.length > 1)
    {
      this.therapyListVisited.pop();
      this.selectTherapy$.next(this.therapyListVisited[this.therapyListVisited.length - 1]);
    }
  }

  SetTherapy (therapySelected:string, ignoreGoToScrollTherapySelected? : boolean)
  {

    this.SetTherapyListVisited(therapySelected);

    if (!ignoreGoToScrollTherapySelected)
      this.GoToScrollTherapySelected(therapySelected);

    this.selectTherapy$.next(therapySelected);

  }

 GoToScrollTherapySelected(therapySelected:string)
 {

   if (this.currentSection != "therapy_section_spied")
      this.triggerScrollTo("therapy_section_spied");
 }


  SetTherapyListVisited(therapySelected: string )
  {

    if (this.therapyListVisited[this.therapyListVisited.length - 1] != therapySelected){
      this.therapyListVisited.push(therapySelected);
    }

  }



  public triggerScrollTo(destination : string) {



    const config: ScrollToConfigOptions = {
	  target: destination,
	  duration: 1800,
	  offset: -100
    };

    this._scrollToService.scrollTo(config);

  }



}
