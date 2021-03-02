import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-big-carousel',
  templateUrl: './big-carousel.component.html',
  styleUrls: ['./big-carousel.component.scss']
})
export class BigCarouselComponent implements OnInit {

  slides: string[] = ["titulo1","titulo2","titulo3"];
  slideAtivo:number = 2;
  constructor() { }

  ngOnInit(): void {
  }

}
