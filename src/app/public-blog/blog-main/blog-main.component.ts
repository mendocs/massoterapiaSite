import { HttpErrorResponse } from '@angular/common/http';
import { Meta } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { BaseComponent } from 'src/app/shared-kernel/components/base-component';
import { UtilsService } from 'src/app/shared-kernel/tools/utils.service';
import { blogs } from '../models/blogs.model';
import { PublicBlogService } from '../services/public-blog.service';

@Component({
  selector: 'app-blog-main',
  templateUrl: './blog-main.component.html',
  styleUrls: ['./blog-main.component.scss']
})
export class BlogMainComponent extends BaseComponent implements OnInit {

  blogsFile = {
		next: (_blogs : blogs[]) => this.populateBlogs(_blogs),
		error: err => this.getError(err),
		complete: () => {},
	  };

    blogsListRegister : blogs[];
    getAllBlogSubscription$ : Subscription;

  constructor(private _PublicBlogService : PublicBlogService,
              private utilsService : UtilsService,
              private _titleService: Title,
              private _meta:Meta) { super(); }


  populateBlogs (_blogs : blogs[]) : void{
    this.isLoading = false;
    this.blogsListRegister = _blogs;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getAllBlogSubscription$ =  this._PublicBlogService.getAllBlog$().subscribe(this.blogsFile);
    this._titleService.setTitle("NEL Zen Massoterapia - Blog");
    this._meta.updateTag( { name:'description', content:'Massoterapia, notícias, BLOG, informação'},"name='description'");
  }

  ngOnDestroy() : void{
    this.getAllBlogSubscription$?.unsubscribe();
  }

  getPlainTextblog(_text : string) : string{
    return this.utilsService.convertToPlain(_text).substring(0,250) + '...';
  }


}
