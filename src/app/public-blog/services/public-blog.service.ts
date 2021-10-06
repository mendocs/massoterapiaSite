import { SlicePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { blogs } from "../models/blogs.model";

@Injectable({
  providedIn: 'root'
})
export class PublicBlogService {

  constructor(private http: HttpClient) { }


  getAllBlog$() : Observable<blogs[]> {
    return this.http.get<blogs[]>(environment.UrlApi + "blog/search/true");
	}



  getBlogByTitle$(title : string) : Observable<blogs> {
    return this.http.get<blogs>(environment.UrlApi + "blog/searchtitlenfd/" + title);
	}

  getSeeAlsoBlog$(title : string) : Observable<blogs[]> {
		return this.http.get<blogs[]>(environment.UrlApi + "blog/search/true")
    .pipe(
		  map((_blog: blogs[]) => _blog.filter(c => c.TitleNFD.toLowerCase().indexOf(title)==-1))
		);
	}


}
