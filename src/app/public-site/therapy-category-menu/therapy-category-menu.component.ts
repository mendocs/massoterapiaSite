import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BaseComponent } from 'src/app/shared-kernel/components/base-component';
import { therapyCategory } from 'src/app/therapy/models/therapy-category-model';
import { PublicSiteService } from '../public-site.service';

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

  showProtocolsActive : boolean = false;

  menuProtocolsSubscription$ : Subscription;

  constructor(private publicSiteService: PublicSiteService) {super(); }

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
    this.publicSiteService.closeMenuProtocols();
    this.showProtocolsActive = !showProtocolsActiveState;
  }

  getProtocolsBackground(image_background : string) : string
  {
    return `../assets/images/therapies/${image_background}` ;
  }



}
