import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { blogs } from 'src/app/public-blog/models/blogs.model';
import { UtilsService } from 'src/app/shared-kernel/tools/utils.service';
import { AdminBlogService } from '../services/admin-blog.service';
import { BaseComponent } from 'src/app/shared-kernel/components/base-component';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent extends BaseComponent implements OnInit {

  blogsListRegister : blogs[];
  //isLoading : boolean = false;
  getAllBlogSubscription$ : Subscription;

  blogsFile = {
		next: (_blogs : blogs[]) => this.populateBlogs(_blogs),
		error: err => this.getError(err),
		complete: () => {},
	  };


  populateBlogs (_blogs : blogs[]) : void{
    this.isLoading = false;
    this.blogsListRegister = _blogs;
  }


  constructor(
    private _AdminBlogService: AdminBlogService,
    private _UtilsService : UtilsService
    ) { super(); }

  ngOnInit(): void {

    this.isLoading = true;
    this.getAllBlogSubscription$ = this._AdminBlogService.getAllBlog$().subscribe(this.blogsFile);
  }

  ngOnDestroy() : void{
    this.getAllBlogSubscription$?.unsubscribe();
  }

  dateformated( _date: Date ) : string
  {
    return this._UtilsService.getDateFormated(_date);
  }

}
