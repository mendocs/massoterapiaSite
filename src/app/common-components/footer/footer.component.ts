import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicSiteService } from 'src/app/public-site/public-site.service';
import { therapy } from 'src/app/therapy/models/therapy-model';
import { TherapyDataService } from 'src/app/therapy/services/therapy-data.service';
import { CommomComponentsService } from '../commom-components.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  therapiesFile = {
		next: (_therapies : therapy[]) => this.populateControlsFromTherapies(_therapies),
		error: err =>this.getError(err) ,
		complete: () => {},
	  };

  phoneContactMask : string;
  phoneContactNoMask : string;
  whatsapplink : string;
  addressLocalService : string;

  therapies : therapy[];

  constructor(
    private therapyDataService : TherapyDataService,
    private publicSiteService: PublicSiteService,
    private _CommomComponentsService : CommomComponentsService,
    private router: Router
    ) { }

  ngOnInit(): void {

    this.therapyDataService.getAllTherapies().subscribe(this.therapiesFile);

    this.phoneContactMask = this._CommomComponentsService.phoneContactMask;
    this.phoneContactNoMask = this._CommomComponentsService.phoneContactNoMask;
    this.whatsapplink = this._CommomComponentsService.whatsapplink;
    this.addressLocalService = this._CommomComponentsService.addressLocalService;

  }

  populateControlsFromTherapies(_therapies: therapy[])
  {
    this.therapies = _therapies;
  }

  navigateTo(navigateId: string)
  {
      this.router.navigate(["/"]);
      this.publicSiteService.SetTherapy(navigateId);

  }

  getError(err : HttpErrorResponse): void{
    console.log(err);
  }

}
