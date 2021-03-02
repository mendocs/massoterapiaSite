import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {therapy} from "../models/therapy-model";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TherapyDataService {



  constructor(private http: HttpClient) { }


  getTherapyByName(nomeParcial: string) {
		return this.http.get<therapy[]>('assets/data/therapies.json')
		.pipe(
		  map((therapies: therapy[]) => therapies.filter(c => c.id.toLowerCase().indexOf(nomeParcial.toLowerCase())>-1))
		);
	  }


    getAllTherapies() {
      return this.http.get<therapy[]>('assets/data/therapies.json');
      }

}
