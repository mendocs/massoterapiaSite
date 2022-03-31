import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { BaseComponent } from 'src/app/shared-kernel/components/base-component';
import { therapyCategory } from 'src/app/therapy/models/therapy-category-model';
import { PublicSiteService } from '../public-site.service';
import { NgGoogleAnalyticsTracker } from "ng-google-analytics";

@Component({
  selector: 'app-therapy-category-menu',
  templateUrl: './therapy-category-menu.component.html',
  styleUrls: ['./therapy-category-menu.component.scss']
})
export class TherapyCategoryMenuComponent extends BaseComponent implements OnInit {

  protocolsMenuFile = {
		next: (_showProtocolsActive : boolean) => this.closeMenuProtocols(_showProtocolsActive),
		error: err => this.getError(err),
		complete: () => {},
	  };


  @Input() therapyCategoryCurrent: therapyCategory;

  //@ViewChild('titleProtocol') classParentSquares: any;

  showProtocolsActive : boolean = false;

  menuProtocolsSubscription$ : Subscription;

  constructor(private publicSiteService: PublicSiteService, public ngAnalytics: NgGoogleAnalyticsTracker) {super(); }

  ngOnInit(): void {
    this.menuProtocolsSubscription$ = this.publicSiteService.menuProtocols$.subscribe(this.protocolsMenuFile);
  }

  ngOnDestroy() : void{
    this.menuProtocolsSubscription$?.unsubscribe();

  }

  closeMenuProtocols(_showProtocolsActive : boolean) : void
  {
    this.showProtocolsActive = _showProtocolsActive;
  }


  showProtocols() : void{

    const showProtocolsActiveState : boolean =  this.showProtocolsActive;
    //this.publicSiteService.closeMenuProtocols();
    this.showProtocolsActive = !showProtocolsActiveState;

    if (this.showProtocolsActive)
      this.ngAnalytics.eventTracker("therapyCategory", "OpenMenu", this.therapyCategoryCurrent.categoria,1);

    this.publicSiteService.navigateTo(this.therapyCategoryCurrent.id + "_spied");

  }

  getProtocolsBackground(image_background : string) : string
  {
    return `../assets/images/therapies/${image_background}` ;
  }

  getCategoryBackground_() : string
  {
    return this.showProtocolsActive ? `bg-${this.therapyCategoryCurrent.image}` : "" ;
  }

  getCategoryBackground (rgbColor : string ) : string
  {
    return rgbColor.replace(",1)",",0.45)") ;
  }

  logClicked(therapyId: string) :void {
    this.ngAnalytics.eventTracker("protocol", "showDetails", therapyId,1);
    this.publicSiteService.SetTherapy(therapyId);
  }

  getCategoryTitleWithouthParentheses() : string {
    return this.therapyCategoryCurrent.categoria.split("(")[0];
  }

  getCategoryTitleInsideParentheses() : string {
    if (this.therapyCategoryCurrent.categoria.includes("("))
      return "(" + this.therapyCategoryCurrent.categoria.split("(")[1];
    else
      return "";
  }


}
