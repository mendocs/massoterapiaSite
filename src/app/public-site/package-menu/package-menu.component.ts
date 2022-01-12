import { Component, Input, OnInit } from '@angular/core';
import { pack } from 'src/app/therapy/models/pack-model';

@Component({
  selector: 'app-package-menu',
  templateUrl: './package-menu.component.html',
  styleUrls: ['./package-menu.component.scss']
})
export class PackageMenuComponent implements OnInit {

  @Input() packCurrent: pack;

  constructor() { }

  ngOnInit(): void {

  }

}
