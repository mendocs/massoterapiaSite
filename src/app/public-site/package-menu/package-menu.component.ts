import { Component, Input, OnInit } from '@angular/core';
import { pack } from 'src/app/therapy/models/pack-model';
import { NgGoogleAnalyticsTracker } from "ng-google-analytics";

@Component({
  selector: 'app-package-menu',
  templateUrl: './package-menu.component.html',
  styleUrls: ['./package-menu.component.scss']
})
export class PackageMenuComponent implements OnInit {

  isCollapsed:boolean = true;

  @Input() packCurrent: pack;

  constructor(public ngAnalytics: NgGoogleAnalyticsTracker) { }

  ngOnInit(): void {
  }

  getPriceWithouthDiscont() : number  {
    //this.packCurrent. .getPriceWithouthDiscont();
    return Math.round(this.packCurrent.preco / ((100-this.packCurrent.desconto)/100));
  }

  getCategoryTitleWithouthPrice(protocolTitle : string) : string {
    return protocolTitle.split("(R$")[0];
  }

  ShowHide() : void{
    this.isCollapsed = !this.isCollapsed;

    if (!this.isCollapsed)
      this.ngAnalytics.eventTracker("Package", "ShowMore", this.packCurrent.id,1);

  }

}
