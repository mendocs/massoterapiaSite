import { Component, Input, OnInit } from '@angular/core';
import { pack } from 'src/app/therapy/models/pack-model';

@Component({
  selector: 'app-package-menu',
  templateUrl: './package-menu.component.html',
  styleUrls: ['./package-menu.component.scss']
})
export class PackageMenuComponent implements OnInit {

  isCollapsed:boolean = true;

  @Input() packCurrent: pack;

  constructor() { }

  ngOnInit(): void {
  }

  getPriceWithouthDiscont() : number  {
    //this.packCurrent. .getPriceWithouthDiscont();
    return Math.round(this.packCurrent.preco / ((100-this.packCurrent.desconto)/100));
  }

}
