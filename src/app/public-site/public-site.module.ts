import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainContainerComponent } from './main-container/main-container.component';

import {SharedKernelModule} from "../shared-kernel/shared-kernel.module";
import { BigCarouselComponent } from './big-carousel/big-carousel.component';
import { TagCloudComponent } from './tag-cloud/tag-cloud.component';
import { TherapySectionComponent } from './therapy-section/therapy-section.component'

import {PublicSiteService} from "./public-site.service";
import { TherapistComponent } from './therapist/therapist.component';
import { ContactComponent } from './contact/contact.component';
import { PriceComponent } from './price/price.component';
import { RouterModule } from '@angular/router';
import { CommonComponentsModule } from '../common-components/common-components.module';




@NgModule({
  declarations: [
    MainContainerComponent,
    BigCarouselComponent,
    TagCloudComponent,
    TherapySectionComponent,
    TherapistComponent,
    ContactComponent,
    PriceComponent
    ],
  imports: [
    CommonModule,
    SharedKernelModule,
    CommonComponentsModule,
    RouterModule
  ],
  providers: [PublicSiteService],
})
export class PublicSiteModule { }
