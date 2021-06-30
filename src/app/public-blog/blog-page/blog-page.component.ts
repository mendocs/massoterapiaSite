import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicBlogService } from '../services/public-blog.service';
import { blogs } from '../models/blogs.model'
import { HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { UtilsService } from 'src/app/shared-kernel/tools/utils.service';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit {

  parameterIdObserver = {
    next: (params) => this.getBlogRegister(params["title"] ),
    error: err => this.getError(err),
    complete: () => {},
    };

  blogObserver = {
    next: (currentBlog : blogs) => this.populateBlog(currentBlog),
    error: err => this.getError(err),
    complete: () => {},
    };

  blogSeeAlsoObserver = {
    next: (first3Blogs : blogs[]) => this.populateSeeAlsoBlog(first3Blogs),
    error: err => this.getError(err),
    complete: () => {},
    };

  blogsListSeeAlso : blogs[];
  currentBlogRegister : blogs;
  currentBlogRegister_title : string;
  currentBlogRegister_text : string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private _PublicBlogService : PublicBlogService,
              private _UtilsService: UtilsService) { }

  ngOnInit(): void {
    this.getParameters();
  }

  populateBlog(currentBlog : blogs): void {
    this.currentBlogRegister = currentBlog;
    this.currentBlogRegister_title = currentBlog.title;
    this.currentBlogRegister_text = currentBlog.text;
  }

  populateSeeAlsoBlog(first3Blogs : blogs[]): void {
    this.blogsListSeeAlso = first3Blogs.slice(0,3);
  }

  BlogRegisterTextSafeHtml() : SafeHtml {
    return this._UtilsService.htmldomSanitizer(this.currentBlogRegister_text);
  }


  getParameters(): void
  {
    this.route.params.subscribe(this.parameterIdObserver);
  }

  getBlogRegister(title: string): void
  {
    this._PublicBlogService.getBlogByTitle$(title).subscribe(this.blogObserver);
    this._PublicBlogService.getSeeAlsoBlog$(title).subscribe(this.blogSeeAlsoObserver);
  }


  getError(err : HttpErrorResponse): void{

    const msgErrorReturn : string =  JSON.stringify(err.error);

    this.router.navigate(["/paginanaoencontrada"]);

  }

}
