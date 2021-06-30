import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { WhatsappComponent } from './whatsapp/whatsapp.component';
import { CommomComponentsService } from './commom-components.service';
import { FooterComponent } from './footer/footer.component';
import { SharedKernelModule } from '../shared-kernel/shared-kernel.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { TopToolbarComponent } from "./top-toolbar/top-toolbar.component"


@NgModule({
  declarations: [HeaderComponent, WhatsappComponent, FooterComponent, PageNotFoundComponent, TopToolbarComponent],
  imports: [
    CommonModule,
    SharedKernelModule,
    RouterModule
  ],
  exports : [ HeaderComponent, WhatsappComponent, FooterComponent, PageNotFoundComponent, TopToolbarComponent],
  providers: [CommomComponentsService],
})
export class CommonComponentsModule { }
