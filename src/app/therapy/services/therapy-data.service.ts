import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {therapy} from "../models/therapy-model";
import { map, switchMap } from 'rxjs/operators';
import { from, Observable, of } from 'rxjs';
import { therapyCategory } from '../models/therapy-category-model';
import { pack } from '../models/pack-model';

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
        (therapies: therapyCategory[]) => therapies.filter(c => c.protocolos.find(this.filterTherapyName.bind(this, nomeParcial)))[0].protocolos.find(this.filterTherapyName.bind(this, nomeParcial))
        //(therapies: therapyCategory[]) => therapies.filter(c => c.tipos.filter(c => c.id.toLowerCase().indexOf(nomeParcial.toLowerCase())>-1))
        //(therapies: therapyCategory[]) => therapies[0].tipos.filter(c => c.id.toLowerCase().indexOf(nomeParcial.toLowerCase())>-1)
        )
		);
	}

/*
  getAlltherapy(): Observable<therapy[]> {

		return this.http.get<therapyCategory[]>('assets/data/therapies.json')
		.pipe(
		  map((therapies: therapyCategory[]) =>
            therapies.map((_therapyCategory : therapyCategory) =>
            _therapyCategory.tipos[0]
          )
        )
		);
	}


*/



getAlltherapy(): Observable<therapy[]> {

  let resultado : therapy[] = [];

  return this.http.get<therapyCategory[]>('assets/data/therapies.json')
  .pipe(
    map((therapies: therapyCategory[]) =>
          therapies.map((_therapyCategory : therapyCategory) =>
          _therapyCategory.protocolos.map((_therapy : therapy)=> resultado.push(_therapy) )
        )
      ),
      switchMap(()=> of(resultado))
  );
}


getTherapybyTitle(titulo : string): Observable<therapy> {

  let resultado : therapy ;

  return this.http.get<therapyCategory[]>('assets/data/therapies.json')
  .pipe(
    map((therapies: therapyCategory[]) =>
          therapies.map((_therapyCategory : therapyCategory) =>
          _therapyCategory.protocolos.filter((_therapy : therapy)=> _therapy.titulo_reduzido == titulo )
          .map ((_therapy : therapy) => resultado = _therapy)
        )
      ),
      switchMap(()=> of(resultado))
  );
}


getPlanbyTitle(titulo : string): Observable<pack> {

  let resultado : pack ;

  return this.http.get<therapyCategory[]>('assets/data/therapies.json')
  .pipe(
    map((therapies: therapyCategory[]) =>
          therapies.map((_therapyCategory : therapyCategory) =>
          _therapyCategory.pacotes.filter((_plan : pack)=> _plan.titulo == titulo )
          .map ((_plan : pack) => resultado = _plan)
        )
      ),
      switchMap(()=> of(resultado))
  );
}


getAllPacks_old(): Observable<pack[]> {

  let resultado : pack[] = [];

  return this.http.get<therapyCategory[]>('assets/data/therapies.json')
  .pipe(
    map((therapies: therapyCategory[]) =>
          therapies.map((_therapyCategory : therapyCategory) =>
          _therapyCategory.pacotes.map((_plan : pack)=> resultado.push(_plan) )
        )
      ),
      switchMap(()=> of(resultado))
  );
}


getAllPacks(): Observable<pack[]> {
  return this.http.get<pack[]>('assets/data/packages.json')
}


  filterTherapyName(nomeParcialToFind: string,therapyCurrent: therapy) : boolean
  {
    return therapyCurrent.id.toLowerCase().indexOf(nomeParcialToFind.toLowerCase())>-1
  }


  getAlltherapyCategories(): Observable<therapyCategory[]> {
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
