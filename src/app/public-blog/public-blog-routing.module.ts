import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogMainComponent } from './blog-main/blog-main.component'
import { BlogPageComponent } from './blog-page/blog-page.component'

const routes: Routes = [
  {path: ":title", component : BlogPageComponent },
  {path: "", component :BlogMainComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicBlogRoutingModule { }
