import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainContainerComponent } from './main-container/main-container.component';
import { TopToolbarComponent } from './top-toolbar/top-toolbar.component';

import {SharedKernelModule} from "../shared-kernel/shared-kernel.module";
import { BigCarouselComponent } from './big-carousel/big-carousel.component';
import { TagCloudComponent } from './tag-cloud/tag-cloud.component';
import { TherapySectionComponent } from './therapy-section/therapy-section.component'

import {PublicSiteService} from "./public-site.service";
import { TherapistComponent } from './therapist/therapist.component';
import { ContactComponent } from './contact/contact.component';
import { PriceComponent } from './price/price.component';
import { FooterComponent } from './footer/footer.component';
import { TopLogoComponent } from './top-logo/top-logo.component';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    MainContainerComponent,
    TopToolbarComponent,
    BigCarouselComponent,
    TagCloudComponent,
    TherapySectionComponent,
    TherapistComponent,
    ContactComponent,
    PriceComponent,
    FooterComponent,
    TopLogoComponent],
  imports: [
    CommonModule,
    SharedKernelModule,
    RouterModule
  ],
  providers: [PublicSiteService],
})
export class PublicSiteModule { }
