import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {

  @Input() isError: boolean = true;
  @Input() messageError: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
