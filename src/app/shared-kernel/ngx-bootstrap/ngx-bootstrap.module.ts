

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
//import { NgxSpinnerModule } from "ngx-bootstrap-spinner";
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { FormsModule }   from '@angular/forms';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule,
    CarouselModule.forRoot(),
    AlertModule.forRoot(),
    ProgressbarModule.forRoot(),
    TypeaheadModule.forRoot()
  ],
  exports:[TooltipModule,ModalModule,AccordionModule,CollapseModule,
    BsDropdownModule,BrowserAnimationsModule,CarouselModule,
    AlertModule,ProgressbarModule, TypeaheadModule,FormsModule
    //NgxSpinnerModule
  ]
})
export class NgxBootsrapModule { }
