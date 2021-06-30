import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxBootsrapModule} from "./ngx-bootstrap/ngx-bootstrap.module";
import { ScrollSpyDirective } from './directives/scroll-spy.directive';
import { ParallaxDirective } from './directives/parallax.directive'
//import { TagCloudModule } from 'angular-tag-cloud-module';
import { DotToParagraphPipe } from './pipes/dot-to-paragraph.pipe';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { FormBaseModule } from '../shared-kernel/forms/form.-base.module';
import { PortugueseBooleanPipe } from './pipes/portuguese-boolean.pipe';
import { UtilsService} from "./tools/utils.service";
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';



@NgModule({
  declarations: [ScrollSpyDirective, ParallaxDirective, DotToParagraphPipe, PortugueseBooleanPipe],
  imports: [
    CommonModule,
    NgxBootsrapModule,
    FormBaseModule,
    //TagCloudModule,
    ScrollToModule.forRoot(),
    ShareButtonsModule,
    ShareIconsModule

  ],
  exports: [
    NgxBootsrapModule,
    FormBaseModule,
    //TagCloudModule,
    DotToParagraphPipe,
    PortugueseBooleanPipe,
    ParallaxDirective,
    ShareButtonsModule,
    ShareIconsModule,
    ScrollSpyDirective],
    providers : [UtilsService]
})
export class SharedKernelModule { }
