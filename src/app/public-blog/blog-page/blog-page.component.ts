import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicBlogService } from '../services/public-blog.service';
import { blogs } from '../models/blogs.model'
import { HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer, SafeHtml, Title } from '@angular/platform-browser';
import { UtilsService } from 'src/app/shared-kernel/tools/utils.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

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
  currentBlogRegister_title : string = "Carregando...";
  currentBlogRegister_text : string = "Carregando...";
  currentBlogRegister_url : string;
  currentBlogRegister_tags : string;

  routeParamsSubscription$ : Subscription;
  getBlogByTitleSubscription$ : Subscription;
  getSeeAlsoBlogSubscription$ : Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private _PublicBlogService : PublicBlogService,
              private _UtilsService: UtilsService,
              private _titleService: Title) { }

  ngOnInit(): void {
    this.getParameters();
  }

  ngOnDestroy() : void {
    this.routeParamsSubscription$?.unsubscribe();
    this.getBlogByTitleSubscription$?.unsubscribe();
    this.getSeeAlsoBlogSubscription$?.unsubscribe();
  }

  populateBlog(currentBlog : blogs): void {
    if (currentBlog){
      this._titleService.setTitle(currentBlog.Title);
      this.currentBlogRegister_tags = currentBlog.Tags;
      this.currentBlogRegister = currentBlog;
      this.currentBlogRegister_title = currentBlog.Title;
      this.currentBlogRegister_text = currentBlog.Text;
    }
    else
      this.router.navigate(["/paginanaoencontrada"]);
  }

  populateSeeAlsoBlog(first3Blogs : blogs[]): void {
    this.blogsListSeeAlso = first3Blogs.slice(0,3);
  }

  BlogRegisterTextSafeHtml() : SafeHtml {
    return this._UtilsService.htmldomSanitizer(this.currentBlogRegister_text);
  }

  getParameters(): void {
    this.routeParamsSubscription$ = this.route.params.subscribe(this.parameterIdObserver);
  }

  getBlogRegister(title: string): void {
    this.currentBlogRegister_url = environment.pathUrl + "/blog/" + title;
    this.getBlogByTitleSubscription$ = this._PublicBlogService.getBlogByTitle$(title).subscribe(this.blogObserver);
    this.getSeeAlsoBlogSubscription$ =  this._PublicBlogService.getSeeAlsoBlog$(title).subscribe(this.blogSeeAlsoObserver);
  }


  getError(err : HttpErrorResponse): void {
    const msgErrorReturn : string =  JSON.stringify(err.error);

    this.router.navigate(["/paginanaoencontrada"]);
  }

}
