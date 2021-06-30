import { Component, OnInit, ViewChild } from '@angular/core';
import { CommomComponentsService } from 'src/app/common-components/commom-components.service';

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

  constructor(private publicSiteService: PublicSiteService, private _CommomComponentsService : CommomComponentsService) { }

  ngOnInit(): void {

    var myvar = document.getElementById("squareContainer");

    this.phoneContactMask = this._CommomComponentsService.phoneContactMask;
    this.phoneContactNoMask = this._CommomComponentsService.phoneContactNoMask;
    this.whatsapplink = this._CommomComponentsService.whatsapplink;
    this.addressLocalService = this._CommomComponentsService.addressLocalService;
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
