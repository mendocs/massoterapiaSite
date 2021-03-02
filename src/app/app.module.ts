import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';


import {SharedKernelModule} from "./shared-kernel/shared-kernel.module";

import {PublicSiteModule} from "./public-site/public-site.module"

import {TherapyModule} from "./therapy/therapy.module"


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    SharedKernelModule,
    PublicSiteModule,
    TherapyModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
