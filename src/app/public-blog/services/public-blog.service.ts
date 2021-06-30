import { SlicePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { blogs } from "../models/blogs.model";

@Injectable({
  providedIn: 'root'
})
export class PublicBlogService {

  constructor(private http: HttpClient) { }


  getAllBlog$() : Observable<blogs[]> {
		return this.http.get<blogs[]>('assets/data/blogsdb.json');
    /*.pipe(
		  map((therapies: blogs[]) => therapies.filter(c => c.id.toLowerCase().indexOf(nomeParcial.toLowerCase())>-1))
		);*/
	}

  getBlogByTitle$(title : string) : Observable<blogs> {
		return this.http.get<blogs[]>('assets/data/blogsdb.json')
    .pipe(
		  map((_blog: blogs[]) => _blog.find(c => c.titleNFD.toLowerCase().indexOf(title)>-1))
		);
	}

  getSeeAlsoBlog$(title : string) : Observable<blogs[]> {
    console.log(title);
		return this.http.get<blogs[]>('assets/data/blogsdb.json')
    .pipe(
		  map((_blog: blogs[]) => _blog.filter(c => c.titleNFD.toLowerCase().indexOf(title)==-1))
		);
	}


}
