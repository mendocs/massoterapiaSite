import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ScrollToConfigOptions, ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { Observable, Subject } from 'rxjs';
import { section } from '../section/models/Isection';

@Injectable({
  providedIn: 'root'
})
export class PublicSiteService {

  public selectTherapy$: Subject<string> = new Subject<string>();

  therapyListVisited : string[] = [];

  public LinkVisited : string;


  public currentSection:string = 'home_spied';

  public menuProtocols$ : Subject<boolean> = new Subject<boolean>();

  constructor(private _scrollToService: ScrollToService, private router: Router) {

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


  closeMenuProtocols() : void
  {
    this.menuProtocols$.next(false);
  }


  goBackTherapy() : void
  {
    if (this.therapyListVisited.length > 1)
    {
      this.therapyListVisited.pop();
      this.selectTherapy$.next(this.therapyListVisited[this.therapyListVisited.length - 1]);
    }
  }

  SetTherapy (therapySelected:string, ignoreGoToScrollTherapySelected? : boolean) : void
  {

    this.router.navigate(["/"]);
    this.SetTherapyListVisited(therapySelected);

    if (!ignoreGoToScrollTherapySelected)
      this.GoToScrollTherapySelected(therapySelected);

    this.selectTherapy$.next(therapySelected);

  }

  GoToScrollTherapySelected(therapySelected:string): void
  {

    if (this.currentSection != "therapy_section_spied")
        this.triggerScrollTo("therapy_section_spied");

    this.LinkVisited = therapySelected;
  }


  SetTherapyListVisited(therapySelected: string ): void
  {

    if (this.therapyListVisited[this.therapyListVisited.length - 1] != therapySelected){
      this.therapyListVisited.push(therapySelected);
    }

  }


  navigateTo(navigateId: string)
  {
    //para dar tempo do navbar fechar, ajustar o scroll e depois posicionar
    setTimeout(()=>{
        if (navigateId.includes("spied"))
          this.triggerScrollTo(navigateId);
        else if (navigateId.includes("ext")) //externo
          this.router.navigate(["/blog"]);
        else
          this.SetTherapy(navigateId);
    }, 200);
  }



  public triggerScrollTo(destination : string): void {

    this.LinkVisited = destination;

    this.router.navigate(["/"]);


    const config: ScrollToConfigOptions = {
	  target: destination,
	  duration: 1800,
	  offset: -100
    };

    this._scrollToService.scrollTo(config);

  }



}
