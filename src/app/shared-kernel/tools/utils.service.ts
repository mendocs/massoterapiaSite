import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }


  getDateFormated(dateCurrent: Date) : string
  {
    //const index = patientCurrent.schedules.length-1;
    let data : Date = new Date(dateCurrent);
    return `${this.formatNumber2Digts(data.getDate())}/${ this.formatNumber2Digts((data.getMonth() + 1)) }/${this.formatNumber2Digts( data.getFullYear())} as ${this.formatNumber2Digts(data.getHours())}:${this.formatNumber2Digts(data.getMinutes())}`;

  }


  formatNumber2Digts(numberToBeFormated : number): string
  {
     return numberToBeFormated.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })
  }


}
