import { Component, OnInit } from '@angular/core';
import { CommomComponentsService } from '../commom-components.service';

@Component({
  selector: 'app-whatsapp-link-message-schedule-template',
  templateUrl: './whatsapp-link-message-schedule-template.component.html',
  styleUrls: ['./whatsapp-link-message-schedule-template.component.scss']
})
export class WhatsappLinkMessageScheduleTemplateComponent implements OnInit {

  phoneContactNoMask : string;
  whatsapplink : string;


  constructor(private _CommomComponentsService : CommomComponentsService) { }

  ngOnInit(): void {

    this.phoneContactNoMask = this._CommomComponentsService.phoneContactNoMask;
    this.whatsapplink = this._CommomComponentsService.whatsapplink;
  }

}
