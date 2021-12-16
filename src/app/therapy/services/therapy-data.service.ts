import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {therapy} from "../models/therapy-model";
import { map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { therapyCategory } from '../models/therapy-category-model';

@Injectable({
  providedIn: 'root'
})
export class TherapyDataService {

  nomeParcialToFind : string;

  constructor(private http: HttpClient) { }


  getTherapyByName(nomeParcial: string): Observable<therapy> {

    this.nomeParcialToFind = nomeParcial;

		return this.http.get<therapyCategory[]>('assets/data/therapies.json')
		.pipe(
		  map(
        (therapies: therapyCategory[]) => therapies.filter(c => c.tipos.find(this.filterTherapyName.bind(this, nomeParcial)))[0].tipos.find(this.filterTherapyName.bind(this, nomeParcial))
        //(therapies: therapyCategory[]) => therapies.filter(c => c.tipos.filter(c => c.id.toLowerCase().indexOf(nomeParcial.toLowerCase())>-1))
        //(therapies: therapyCategory[]) => therapies[0].tipos.filter(c => c.id.toLowerCase().indexOf(nomeParcial.toLowerCase())>-1)
        )
		);
	  }

  filterTherapyName(nomeParcialToFind: string,therapyCurrent: therapy) : boolean
  {
    return therapyCurrent.id.toLowerCase().indexOf(nomeParcialToFind.toLowerCase())>-1
  }


    getAllTherapies() {
      return this.http.get<therapyCategory[]>('assets/data/therapies.json').
      pipe(
        //switchMap((therapies: therapy[]) => of(this.removeFistItem(therapies)))
      )
      ;
    }

    removeFistItem(therapies: therapy[]) : therapy[]
    {
      therapies.shift();
      return therapies;
    }

}
