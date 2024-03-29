import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor( private domSanitizer: DomSanitizer) { }


  public getDateFormated(dateCurrent: Date) : string {
    let data : Date = new Date(dateCurrent);
    return `${this.formatNumber2Digts(data.getDate())}/${ this.formatNumber2Digts((data.getMonth() + 1)) }/${this.formatNumber2Digts( data.getFullYear())} as ${this.getDateFormatedHourMinutes(data)}`;
  }

  public getDateFormatedHourMinutes(dateCurrent: Date) : string {
    let data : Date = new Date(dateCurrent);
    return ` ${this.formatNumber2Digts(data.getHours())}:${this.formatNumber2Digts(data.getMinutes())}`;
  }


  public formatNumber2Digts(numberToBeFormated : number): string {
     return numberToBeFormated.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })
  }

  public timeConvert(n : number): string {
    var num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return this.formatNumber2Digts(rhours) + ":" + this.formatNumber2Digts(rminutes);
  }

  public getSchedulAvaliableDescription(date1: Date, duration : number , date2: Date) : string {
    let dt1: Date = new Date();
    var returnDescription :string = "Agenda: ";

    if (date1){
      dt1 = new Date(date1);
      dt1.setMinutes(dt1.getMinutes() + duration);
    }

    if (!date2)
      returnDescription += `${this.getDateFormatedHourMinutes(dt1)} em diante`;
    else if (!date1)
    {
      let dt2: Date = new Date(date2);
      dt2.setMinutes(dt2.getMinutes() - 50);
      returnDescription += `Antes de ${this.getDateFormatedHourMinutes(dt2)} `;
    }
    else
    {
      let dt2: Date = new Date(date2);
      dt2.setMinutes(dt2.getMinutes() - 50); //50 duração minima estimada para agenda livre

      let interval : number = this.getIntervalMinutes(dt1,dt2);

      if (interval >= 0)
        returnDescription += `${this.getDateFormatedHourMinutes(dt1)} ~ ${this.getDateFormatedHourMinutes(dt2)}`;
      else
        returnDescription += "indisponível";
    }

    return returnDescription;

  }

  public getIntervalMinutes(date1: Date, date2: Date) : number {
    date1.setSeconds(0);
    date2.setSeconds(0);

    var diff =(date2.getTime() - date1.getTime()) / 1000;
    diff /= 60;
    return Math.round(diff);
  }

  public getIntervalDescription(date1: Date, duration : number, date2: Date) : string {
    let dt1: Date = new Date(date1);

    var returnDescription :string = "";

    dt1.setMinutes(dt1.getMinutes() + duration); //50);

    let interval : number = this.getIntervalMinutes(dt1,date2);

    if (interval >0)
      return  "intervalo: " + this.timeConvert(interval);
    else
      return  "intervalo: 00" ;
  }

  public removeAccent(text : string) : string {
    let result : string = text.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    result = result.replace(/[^0-9a-zA-Zs]/g, "-")

    while (result.includes("--"))
      result = result.replace("--","-");

    if (result.endsWith("-"))
      result = result.substring(0,result.length-1);

    return result.toLowerCase();
  }

  public removeLastName(name : string) : string{
    return name.split(" ")[0];
  }

  public convertToPlain(html: string ) : string {

    // Create a new div element
    var tempDivElement = document.createElement("div");

    // Set the HTML content with the given value
    tempDivElement.innerHTML = html;

    // Retrieve the text property of the element
    return tempDivElement.textContent || tempDivElement.innerText || "";
  }

  public htmldomSanitizer(_html : string  ) : SafeHtml {
    let retorno = this.domSanitizer.bypassSecurityTrustHtml(_html);
    return retorno;
  }


  public ScrollTo(destination : string): void {

    const element = document.getElementById(destination);

    //element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});

    const duration = 800;

    const scrollToTarget = function (target) {
        const top = target.getBoundingClientRect().top;
        const startPos = window.pageYOffset;
        const diff = top;

        let startTime = null;
        let requestId;

        const loop = function (currentTime) {
            if (!startTime) {
                startTime = currentTime;
            }

            // Elapsed time in miliseconds
            const time = currentTime - startTime;

            const percent = Math.min(time / duration, 1);
            window.scrollTo(0, startPos + diff * percent);

            if (time < duration) {
                // Continue moving
                requestId = window.requestAnimationFrame(loop);
            } else {
                window.cancelAnimationFrame(requestId);
            }
        };
        requestId = window.requestAnimationFrame(loop);
    };

    scrollToTarget(element);
  }

}
