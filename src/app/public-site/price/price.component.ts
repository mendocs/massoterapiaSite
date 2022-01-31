import { Component, OnInit } from '@angular/core';
import { PublicSiteService } from '../public-site.service';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent implements OnInit {

  constructor(private publicSiteService: PublicSiteService) { }

  ngOnInit(): void {
  }

  public navigateTo(destination : string) {
    this.publicSiteService.navigateTo(destination);
  }


}
