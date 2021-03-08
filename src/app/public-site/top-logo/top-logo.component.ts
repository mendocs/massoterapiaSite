import { Component, OnInit } from '@angular/core';
import { PublicSiteService } from '../public-site.service';

@Component({
  selector: 'app-top-logo',
  templateUrl: './top-logo.component.html',
  styleUrls: ['./top-logo.component.scss']
})
export class TopLogoComponent implements OnInit {

  phoneContactMask : string;
  phoneContactNoMask : string;
  whatsapplink : string;


  constructor(private publicSiteService: PublicSiteService) { }

  ngOnInit(): void {
    this.phoneContactMask = this.publicSiteService.phoneContactMask;
    this.phoneContactNoMask = this.publicSiteService.phoneContactNoMask;
    this.whatsapplink = this.publicSiteService.whatsapplink;

  }

}
