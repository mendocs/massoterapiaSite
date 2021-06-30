import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/shared-kernel/tools/utils.service';
import { blogs } from '../models/blogs.model';
import { PublicBlogService } from '../services/public-blog.service';

@Component({
  selector: 'app-blog-main',
  templateUrl: './blog-main.component.html',
  styleUrls: ['./blog-main.component.scss']
})
export class BlogMainComponent implements OnInit {

  blogsFile = {
		next: (_blogs : blogs[]) => this.populateBlogs(_blogs),
		error: err => this.getError(err),
		complete: () => {},
	  };

    blogsListRegister : blogs[];

  constructor(private _PublicBlogService : PublicBlogService,
              private utilsService : UtilsService) { }

  getError(err : HttpErrorResponse): void{
    console.log(err);
  }

  populateBlogs (_blogs : blogs[]) : void{
    this.blogsListRegister = _blogs;
  }

  ngOnInit(): void {
    this._PublicBlogService.getAllBlog$().subscribe(this.blogsFile);
  }

  getPlainTextblog(_text : string) : string{
    return this.utilsService.convertToPlain(_text).substring(0,250) + '...';
  }

}
