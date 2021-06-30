import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommomComponentsService {

  phoneContactMask : string;
  phoneContactNoMask : string;
  whatsapplink : string;
  addressLocalService : string;

  constructor() {
    this.phoneContactMask = environment.phoneContactMask;
    this.phoneContactNoMask = environment.phoneContactnoMask;
    this.whatsapplink = environment.whatsapplink;
    this.addressLocalService = environment.address;
  }
}
