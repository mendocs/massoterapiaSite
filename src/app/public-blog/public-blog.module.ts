import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicBlogRoutingModule } from './public-blog-routing.module';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { SharedKernelModule } from '../shared-kernel/shared-kernel.module';
import { BlogMainComponent } from './blog-main/blog-main.component';
import { PublicBlogService } from './services/public-blog.service';
import { BlogPageComponent } from './blog-page/blog-page.component';


@NgModule({
  declarations: [BlogMainComponent, BlogPageComponent],
  imports: [
    CommonModule,
    PublicBlogRoutingModule,
    SharedKernelModule,
    CommonComponentsModule
  ],
  providers: [PublicBlogService],
})
export class PublicBlogModule { }
