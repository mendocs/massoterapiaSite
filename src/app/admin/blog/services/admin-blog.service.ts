import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { blogs } from 'src/app/public-blog/models/blogs.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminBlogService {

  constructor(private http: HttpClient) { }

  getAllBlog$() : Observable<blogs[]> {
    return this.http.get<blogs[]>(environment.UrlApi + "blog/search");
	}

  getBlogByKey$(key : string) : Observable<blogs> {
		return this.http.get<blogs>(environment.UrlApi + 'blog/getkey/' + key);
	}

  updateBlog$ (_blogs : blogs) : Observable<number> {
    return this.http.put <number> (environment.UrlApi + 'blog', _blogs, {observe: 'response'})
        .pipe(
          map (results => results.body )
        );
  }

  createBlog$( _blogs : blogs) : Observable<blogs> {
    _blogs.Key = "00000000-0000-0000-0000-000000000000";
    return this.http.post <blogs> (environment.UrlApi + 'blog', _blogs, {observe: 'response'})
        .pipe(
          map (results => results.body )
        );
  }

}
