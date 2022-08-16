import { BrowserModule, Meta } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import {SharedKernelModule} from "./shared-kernel/shared-kernel.module";
import { CommonComponentsModule } from "./common-components/common-components.module";

import {PublicSiteModule} from "./public-site/public-site.module"
import {TherapyModule} from "./therapy/therapy.module";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AuthService } from './admin/services/auth.service';
import { NgGoogleAnalyticsModule } from "ng-google-analytics";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    SharedKernelModule,
    CommonComponentsModule,
    PublicSiteModule,
    TherapyModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    //NgGoogleAnalyticsModule.forRoot({ id: "UA-224092970-1" }) // G-5YJTERYP2K " })
  ],
  providers: [Meta, HttpClientModule , AuthService],
  bootstrap: [AppComponent],
  exports : [RouterModule]
})
export class AppModule { }
