import { Component, OnInit, ViewChild } from '@angular/core';

import { PublicSiteService } from '../public-site.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @ViewChild('classParentSquares') classParentSquares: any;

  phoneContactNoMask : string;
  phoneContactMask : string;
  whatsapplink : string;
  addressLocalService : string;

  constructor(private publicSiteService: PublicSiteService) { }

  ngOnInit(): void {

    var myvar = document.getElementById("squareContainer");

    this.phoneContactMask = this.publicSiteService.phoneContactMask;
    this.phoneContactNoMask = this.publicSiteService.phoneContactNoMask;
    this.whatsapplink = this.publicSiteService.whatsapplink;
    this.addressLocalService = this.publicSiteService.addressLocalService;
  }

  ngAfterViewInit1() : void
  {
    var myvar = document.getElementById("squareContainer");
  }

  verifyDisplayMD(): boolean
  {
    var myvar = document.getElementById("verifyDisplay");

    return (window.getComputedStyle(myvar).display === "none" )
  }

}
