import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { CloudData, CloudOptions, ZoomOnHoverOptions } from 'angular-tag-cloud-module';
import { PublicSiteService } from '../public-site.service';

import {section} from '../../section/models/Isection'

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnInit {





  sections : section[] ;

  constructor(private publicSiteService: PublicSiteService, private _scrollToService: ScrollToService) { }

  ngOnInit(): void {

    this.sections = this.publicSiteService.sections;

    AOS.init();
  }


  public triggerScrollTo(destination : string) {

    this.publicSiteService.triggerScrollTo(destination);

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
