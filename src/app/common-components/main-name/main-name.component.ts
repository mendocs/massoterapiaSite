import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-name',
  templateUrl: './main-name.component.html',
  styleUrls: ['./main-name.component.scss']
})
export class MainNameComponent implements OnInit {

  @Input() fontSizePercent: string = "100%";

  constructor() { }

  ngOnInit(): void {
  }

}
