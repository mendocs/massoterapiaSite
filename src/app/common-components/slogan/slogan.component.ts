import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slogan',
  templateUrl: './slogan.component.html',
  styleUrls: ['./slogan.component.scss']
})
export class SloganComponent implements OnInit {

  @Input() fontSizePercent: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
