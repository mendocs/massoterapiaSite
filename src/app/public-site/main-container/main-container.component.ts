import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { CloudData, CloudOptions, ZoomOnHoverOptions } from 'angular-tag-cloud-module';
import { PublicSiteService } from '../public-site.service';

import {section} from '../../section/models/Isection'
import { CommonComponentsModule } from 'src/app/common-components/common-components.module';
import { CommomComponentsService } from 'src/app/common-components/commom-components.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnInit {

  whatsapplink : string;
  phoneContactNoMask : string;
  phoneContactMask : string;



  sections : section[] ;

  constructor(
              private publicSiteService: PublicSiteService,
              private _scrollToService: ScrollToService,
              private _CommomComponentsService : CommomComponentsService,
              private _titleService: Title) { }

  ngOnInit(): void {

    this._titleService.setTitle("NEL Zen Massoterapia");

    if (this.publicSiteService.LinkVisited)
      this.publicSiteService.navigateTo(this.publicSiteService.LinkVisited);


    this.whatsapplink = this._CommomComponentsService.whatsapplink;
    this.phoneContactNoMask = this._CommomComponentsService.phoneContactNoMask;
    this.phoneContactMask = this._CommomComponentsService.phoneContactMask;

    this.sections = this.publicSiteService.sections;

    AOS.init();
  }


  public navigateTo(destination : string) {

    this.publicSiteService.navigateTo(destination);
    //this.publicSiteService.triggerScrollTo(destination);

  }

  onSectionChange(sectionId: string) {
    this.publicSiteService.currentSection = sectionId;
  }

  getCurrentSection() : string
  {
    return this.publicSiteService.currentSection;
  }


  verifyCurrentSection(section : string) : boolean
  {
    return (section === this.getCurrentSection());
  }


}
