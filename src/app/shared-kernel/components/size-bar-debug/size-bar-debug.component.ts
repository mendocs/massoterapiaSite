import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-size-bar-debug',
  templateUrl: './size-bar-debug.component.html',
  styleUrls: ['./size-bar-debug.component.scss']
})
export class SizeBarDebugComponent implements OnInit {

  isDebug : boolean = !environment.production;

  constructor() { }

  ngOnInit(): void {
  }

}
