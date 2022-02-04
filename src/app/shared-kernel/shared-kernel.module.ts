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
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { SuccessMessageComponent } from './components/success-message/success-message.component';
import { SizeBarDebugComponent } from './components/size-bar-debug/size-bar-debug.component';


@NgModule({
  declarations: [ScrollSpyDirective, ParallaxDirective, DotToParagraphPipe, PortugueseBooleanPipe, LoadingSpinnerComponent, ErrorMessageComponent, SuccessMessageComponent, SizeBarDebugComponent],
  imports: [
    CommonModule,
    NgxBootsrapModule,
    FormBaseModule,
    //TagCloudModule,
    ScrollToModule.forRoot(),
    ShareButtonsModule,
    ShareIconsModule,
    HttpClientModule,
    AngularEditorModule

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
    ScrollSpyDirective,
    HttpClientModule,
    AngularEditorModule,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
    SuccessMessageComponent,
    SizeBarDebugComponent
  ],
    providers : [UtilsService]
})
export class SharedKernelModule { }
