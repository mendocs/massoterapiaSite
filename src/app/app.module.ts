import { BrowserModule } from '@angular/platform-browser';
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
    RouterModule
  ],
  providers: [HttpClientModule , AuthService],
  bootstrap: [AppComponent],
  exports : [RouterModule]
})
export class AppModule { }
