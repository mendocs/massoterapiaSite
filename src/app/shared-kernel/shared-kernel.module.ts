import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxBootsrapModule} from "./ngx-bootstrap/ngx-bootstrap.module";
import { ScrollSpyDirective } from './directives/scroll-spy.directive';
import { ParallaxDirective } from './directives/parallax.directive'
import { TagCloudModule } from 'angular-tag-cloud-module';
import { DotToParagraphPipe } from './pipes/dot-to-paragraph.pipe';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';



@NgModule({
  declarations: [ScrollSpyDirective, ParallaxDirective, DotToParagraphPipe],
  imports: [
    CommonModule,
    NgxBootsrapModule,
    TagCloudModule,
    ScrollToModule.forRoot()
  ],
  exports: [NgxBootsrapModule, TagCloudModule, DotToParagraphPipe,ParallaxDirective,ScrollSpyDirective]
})
export class SharedKernelModule { }
