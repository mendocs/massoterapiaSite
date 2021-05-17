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

  getDateFormatedHourMinutes(dateCurrent: Date) : string
  {

    //const index = patientCurrent.schedules.length-1;
    let data : Date = new Date(dateCurrent);
    return ` ${this.formatNumber2Digts(data.getHours())}:${this.formatNumber2Digts(data.getMinutes())}`;

  }


  formatNumber2Digts(numberToBeFormated : number): string
  {
     return numberToBeFormated.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })
  }

  timeConvert(n : number): string {
    var num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return this.formatNumber2Digts(rhours) + ":" + this.formatNumber2Digts(rminutes);
  }

  getSchedulAvaliableDescription(date1: Date, date2: Date) : string
  {
    var returnDescription :string = "Agenda: ";

    let dt1: Date = new Date(date1);
    let dt2: Date = new Date(date2);

    dt1.setMinutes(dt1.getMinutes() + 50);
    dt2.setMinutes(dt2.getMinutes() -50);

    let interval : number = this.getIntervalMinutes(dt1,dt2);

    console.log(interval);
    if (interval >= 0)
      returnDescription += `${this.getDateFormatedHourMinutes(dt1)} ~ ${this.getDateFormatedHourMinutes(dt2)}`;
    else
      returnDescription += "indisponível";

    return returnDescription;

  }

  getIntervalMinutes(date1: Date, date2: Date) : number
  {

    date1.setSeconds(0);
    date2.setSeconds(0);

    var diff =(date2.getTime() - date1.getTime()) / 1000;
    diff /= 60;
    return Math.round(diff);
  }

  getIntervalDescription(date1: Date, date2: Date) : string
  {

    let dt1: Date = new Date(date1);

    var returnDescription :string = "";

    dt1.setMinutes(dt1.getMinutes() + 50);


    let interval : number = this.getIntervalMinutes(dt1,date2);
    if (interval >0)
      return  "intervalo: " + this.timeConvert(interval);
    else
    return  "intervalo: 00" ;




  }



}
